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
});

export default defineEventHandler(async (event) => {
  // Rate limiting by IP
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown';
  if (!checkRateLimit(ip)) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Troppi messaggi inviati. Riprova tra qualche minuto.',
    });
  }

  // Parse and validate request body
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

  // Honeypot: if the hidden 'website' field has a value, it's a bot
  if (result.output.website) {
    // Silently return success to not tip off the bot
    return {
      success: true,
      message: 'Messaggio inviato con successo!',
    };
  }

  const { name, surname, email, message } = result.output;

  // Get SMTP config from runtime
  const config = useRuntimeConfig();
  const { smtpHost, smtpPort, smtpUser, smtpPass, smtpTo } = config;

  // Check if SMTP is configured
  if (!smtpHost || !smtpUser || !smtpPass) {
    console.warn('[SMTP] Non configurato. Dati del form ricevuti:', { name, surname, email });

    // In development, return success without sending email
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

  // Create SMTP transporter
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  // Build email HTML (escape user input to prevent XSS)
  const safeName = escapeHtml(name);
  const safeSurname = escapeHtml(surname);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  const htmlBody = `
    <div style="font-family: 'Nunito', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #CC7722, #e8943a); padding: 30px; border-radius: 24px 24px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-style: italic;">Albergo Al Sole</h1>
        <p style="color: rgba(255,255,255,0.85); margin: 5px 0 0;">Nuova richiesta di contatto</p>
      </div>
      <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 24px 24px; border: 1px solid #e5e7eb; border-top: none;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 120px;">Nome:</td>
            <td style="padding: 8px 0; color: #4b5563;">${safeName} ${safeSurname}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #CC7722;">${safeEmail}</a></td>
          </tr>
        </table>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
        <p style="font-weight: bold; color: #374151; margin-bottom: 8px;">Messaggio:</p>
        <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
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
