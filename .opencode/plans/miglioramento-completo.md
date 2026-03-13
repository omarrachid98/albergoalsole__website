# Piano di Miglioramento Completo - Albergo Al Sole Website

## Stato: Analisi completata, pronto per implementazione

---

## Fase 1 - Fix Bug Critici

### 1.1 Fix form binding su index.vue (riga 17)
- **Bug**: `handle-submit="(data) => console.log(data)"` passa una stringa, non una funzione
- **Fix**: Aggiungere script handler `onSubmit` + usare `:handle-submit="onSubmit"`

### 1.2 Fix durata animazione GSAP (our-services.vue:46)
- **Bug**: `duration: 19` secondi (19 secondi!)
- **Fix**: `duration: 1.2`

### 1.3 Fix typo CSS (main.css:109)
- **Bug**: `card:nth-child(3) img` manca il punto
- **Fix**: `.card:nth-child(3) img`

### 1.4 Fix type mismatch form submit (contacts-us-form.vue:36)
- **Bug**: `props.handleSubmit(event)` passa FormSubmitEvent invece di ContactsFormTypes
- **Fix**: `props.handleSubmit(formData)`

### 1.5 Fix className → class (app.vue:2,5)
- **Bug**: `className` è JSX, non Vue idiomatico
- **Fix**: Sostituire con `class`

---

## Fase 2 - Architettura e Code Quality

### 2.1 Creare layout default.vue
- Spostare Header + Footer da app.vue a `app/layouts/default.vue`
- Semplificare app.vue a `<NuxtLayout><NuxtPage/></NuxtLayout>`

### 2.2 Creare composable useGsap.ts
- `app/composables/useGsap.ts` per lazy-load consistente di GSAP + ScrollTrigger
- Eliminare duplicazione import in 4 componenti diversi

### 2.3 Spostare features/ dentro components/
- Rinominare `app/features/*` → `app/components/features/*`
- Beneficio: auto-import Nuxt, niente più import manuali

### 2.4 Rimuovere ClientOnly non necessari
- Header e Footer devono renderizzare in SSR per SEO
- Proteggere solo le animazioni GSAP con `onMounted`/`process.client`

### 2.5 Sostituire `<img>` con `<NuxtImg>`
- Tutti i tag img → NuxtImg per ottimizzazione automatica

### 2.6 Fix footer links
- `<a href="#">` → `<NuxtLink to="/">` con route reali

---

## Fase 3 - SEO e Accessibilità

### 3.1 useHead()/useSeoMeta() su ogni pagina
- Home: title, description, OG tags
- Contact-us: title, description
- Gallery: title, description
- 404: title

### 3.2 lang="it" nella config
- nuxt.config.ts → `app: { head: { htmlAttrs: { lang: 'it' } } }`

### 3.3 ARIA labels
- Bottone menu mobile: `aria-label="Apri menu"`
- Lightbox close: `aria-label="Chiudi immagine"`
- Icona busta: `aria-label="Contattaci"`
- Nav: `aria-label="Navigazione principale"`

### 3.4 Supporto tastiera lightbox
- Escape per chiudere
- Focus trap nel lightbox
- role="dialog" aria-modal="true"

### 3.5 Fix contrasto colori
- Footer: `text-gray-400` su #CC7722 → `text-amber-100`
- Header scrolled nav: `text-gray-700` → `text-gray-900`

### 3.6 Pagina 404
- `app/pages/[...slug].vue` o `error.vue`
- Design bubble-style, link a Home

---

## Fase 4 - UI a "Bolle" (Glass-morphism ovunque)

### 4.1 Cards servizi
- rounded-3xl, bg-white/60 backdrop-blur-md, border border-white/30
- Hover: scale(1.02), shadow-2xl, bg-white/80
- Rimuovere badge NuxtUI

### 4.2 Form contatto
- Container bubble: rounded-3xl bg-white/50 backdrop-blur-lg shadow-xl
- Input: rounded-full, bg-white/70
- Bottone submit: rounded-full, gradient soft

### 4.3 Bottoni
- Tutti rounded-full (pill-shaped)
- bg-white/70 backdrop-blur-md hover:bg-white/90
- Transizioni smooth

### 4.4 Gallery
- Card immagini: rounded-3xl overflow-hidden
- Lightbox: rounded-3xl, glass container

### 4.5 Footer
- Glass overlay: bg-[#CC7722]/90 backdrop-blur-md
- Border-top rounded: rounded-t-[3rem]
- Sezioni interne con glass cards

### 4.6 Hero
- Immagine con rounded-b-[3rem] per bordo inferiore morbido
- Possibile overlay gradient sottile

### 4.7 Who We Are
- Testo in glass card rounded-3xl
- Immagine circular mantenuta

---

## Fase 5 - Contenuti e Pulizia Placeholder

### 5.1 Sostituire Lorem Ipsum (who-we-are.vue)
- Testo realistico per hotel a Lusiana Conco

### 5.2 Rimuovere badge "NuxtUI"
- Eliminare UBadge dalle card servizi

### 5.3 Deduplicare servizi (services.ts)
- Tenere: Wifi, Lingue, Bar, Cucina marocchina
- Aggiungere: Parcheggio, Terrazza panoramica

### 5.4 Fix UI rotti
- Bottone "Vai alla galleria" → NuxtLink to="/gallery"
- Icona busta mobile → NuxtLink to="/contact-us"
- Rimuovere cerchi A/B dal desktop header

---

## Fase 6 - SMTP Email (Scheletro Nodemailer)

### 6.1 Installare nodemailer
- `npm install nodemailer`
- `npm install -D @types/nodemailer`

### 6.2 Creare .env.example
```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your-password
SMTP_FROM=noreply@albergoalsolelusiana.it
SMTP_TO=info@albergoalsolelusiana.it
```

### 6.3 Creare server/api/contact.post.ts
- Validazione input server-side con Valibot
- Configurazione Nodemailer transporter
- Template HTML email
- Error handling con status codes appropriati

### 6.4 Aggiornare runtime config (nuxt.config.ts)
```ts
runtimeConfig: {
  smtpHost: '',
  smtpPort: 587,
  smtpUser: '',
  smtpPass: '',
  smtpFrom: '',
  smtpTo: '',
}
```

### 6.5 Aggiornare form component
- `$fetch('/api/contact', { method: 'POST', body: formData })`
- Stato loading sul bottone
- Toast di successo/errore con Nuxt UI

---

## Fase 7 - Verifica Finale
- `npm run build` per verificare che tutto compili
- Review di tutti i file modificati
