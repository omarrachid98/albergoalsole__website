// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxt/ui', '@nuxt/image', '@nuxt/icon', '@nuxtjs/sitemap'],

  colorMode: {
    preference: 'light',
  },

  site: {
    url: 'https://www.alsolelusiana.it',
    name: 'Albergo Al Sole',
  },

  image: {
    quality: 80,
    domains: ['picsum.photos'],
  },
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'it' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#CC7722' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  runtimeConfig: {
    smtpHost: process.env.SMTP_HOST || '',
    smtpPort: Number(process.env.SMTP_PORT) || 587,
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || '',
    smtpTo: process.env.SMTP_TO || 'info@alsolelusiana.it',
  },
});
