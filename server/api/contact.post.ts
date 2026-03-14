import nodemailer from 'nodemailer';
import * as v from 'valibot';

// Simple in-memory rate limiter (per IP, max 5 requests per 15 minutes)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

// Cleanup stale entries every 30 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}, 30 * 60 * 1000);

// Escape HTML to prevent XSS in email body
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Server-side validation schema
const contactSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1, 'Il nome è obbligatorio')),
  surname: v.pipe(v.string(), v.minLength(1, 'Il cognome è obbligatorio')),
  email: v.pipe(v.string(), v.email('Email non valida')),
  message: v.pipe(v.string(), v.minLength(1, 'Il messaggio è obbligatorio')),
  // Honeypot field: must be empty (bots fill it in)
  website: v.optional(v.pipe(v.string(), v.maxLength(0))),
  // reCAPTCHA v3 token
  recaptchaToken: v.optional(v.string()),
});

// Verify reCAPTCHA v3 token with Google API
interface RecaptchaResponse {
  success: boolean;
  score?: number;
  action?: string;
  'error-codes'?: string[];
}

async function verifyRecaptcha(token: string, secretKey: string): Promise<{ success: boolean; score: number }> {
  const response = await $fetch<RecaptchaResponse>('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: secretKey,
      response: token,
    }).toString(),
  });

  return {
    success: response.success === true,
    score: response.score ?? 0,
  };
}

export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown';
  if (!checkRateLimit(ip)) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Troppi messaggi inviati. Riprova tra qualche minuto.',
    });
  }

  const body = await readBody(event);

  const result = v.safeParse(contactSchema, body);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Dati non validi',
      data: result.issues.map((issue) => ({
        field: issue.path?.[0]?.key,
        message: issue.message,
      })),
    });
  }

  if (result.output.website) {
    return {
      success: true,
      message: 'Messaggio inviato con successo!',
    };
  }

  const { name, surname, email, message } = result.output;

  const config = useRuntimeConfig();
  const { recaptchaSecretKey } = config;

  if (recaptchaSecretKey) {
    const token = result.output.recaptchaToken;
    if (!token) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Verifica reCAPTCHA mancante. Ricarica la pagina e riprova.',
      });
    }

    const recaptchaResult = await verifyRecaptcha(token, recaptchaSecretKey);
    if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
      console.warn(`[reCAPTCHA] Verifica fallita - success: ${recaptchaResult.success}, score: ${recaptchaResult.score}, ip: ${ip}`);
      throw createError({
        statusCode: 403,
        statusMessage: 'Verifica reCAPTCHA fallita. Riprova più tardi.',
      });
    }
  }

  const { smtpHost, smtpPort, smtpUser, smtpPass, smtpTo } = config;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.warn('[SMTP] Non configurato. Dati del form ricevuti:', { name, surname, email });

    if (process.dev) {
      return {
        success: true,
        message: 'Form ricevuto (SMTP non configurato, modalità sviluppo)',
      };
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Il servizio email non è configurato.',
    });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const safeName = escapeHtml(name);
  const safeSurname = escapeHtml(surname);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #f9fafb; border-radius: 16px; overflow: hidden;">
      <!-- Header brand -->
      <div style="background: #CC7722; padding: 24px 28px; text-align: center;">
        <p style="margin: 0; font-size: 22px; font-weight: bold; font-style: italic; color: white; letter-spacing: 0.5px;">Albergo Al Sole</p>
        <p style="margin: 6px 0 0; font-size: 13px; color: rgba(255,255,255,0.8);">Hotel e Ristorante &bull; Lusiana Conco</p>
      </div>

      <!-- Body -->
      <div style="padding: 28px;">

        <!-- Info card -->
        <div style="background: white; border-radius: 12px; padding: 20px 24px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
          <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
            <tr>
              <td style="padding: 6px 0; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 0.5px; width: 70px; vertical-align: top;">Nome</td>
              <td style="padding: 6px 0; font-size: 15px; color: #1a1a1a; font-weight: bold;">${safeName} ${safeSurname}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top;">Email</td>
              <td style="padding: 6px 0; font-size: 15px;"><a href="mailto:${safeEmail}" style="color: #CC7722; text-decoration: none;">${safeEmail}</a></td>
            </tr>
          </table>
        </div>

        <!-- Messaggio card -->
        <div style="background: white; border-radius: 12px; padding: 20px 24px; border: 1px solid #e5e7eb;">
          <p style="margin: 0 0 12px; font-size: 12px; color: #CC7722; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">Messaggio</p>
          <p style="margin: 0; font-size: 14px; color: #333; line-height: 1.8; white-space: pre-wrap;">${safeMessage}</p>
        </div>

      </div>

      <!-- Footer -->
      <div style="padding: 0 28px 24px; text-align: center;">
        <p style="margin: 0 0 4px; font-size: 12px; color: #999;">Albergo Al Sole &bull; Via VII Comuni 2, Lusiana Conco (VI)</p>
        <p style="margin: 0; font-size: 12px;">
          <a href="tel:+390424406004" style="color: #CC7722; text-decoration: none;">0424 406004</a>
          &nbsp;&bull;&nbsp;
          <a href="https://www.alsolelusiana.it" style="color: #CC7722; text-decoration: none;">alsolelusiana.it</a>
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Albergo Al Sole - Sito Web" <${smtpUser}>`,
      to: smtpTo,
      replyTo: email,
      subject: `Nuova richiesta da ${safeName} ${safeSurname}`,
      html: htmlBody,
      text: `Nome: ${safeName} ${safeSurname}\nEmail: ${safeEmail}\n\nMessaggio:\n${safeMessage}`,
    });

    return {
      success: true,
      message: 'Messaggio inviato con successo!',
    };
  } catch (error: unknown) {
    console.error('[SMTP] Errore invio email:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Errore durante l\'invio del messaggio. Riprova più tardi.',
    });
  }
});
