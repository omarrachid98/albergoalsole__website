<script setup lang="ts">
  import { SITE } from '~/constants/site';

  useSeoMeta({
    title: `Contattaci | ${SITE.name} - Hotel e Ristorante a ${SITE.address.locality}`,
    ogTitle: `Contattaci | ${SITE.name}`,
    description: `Contatta l'${SITE.name} per prenotazioni e informazioni. Hotel e ristorante a ${SITE.address.locality}, Altopiano di Asiago. Telefono: ${SITE.phone}, Email: ${SITE.email}.`,
    ogDescription: `Contatta l'${SITE.name} per prenotazioni e informazioni. Hotel e ristorante a ${SITE.address.locality}, Altopiano di Asiago.`,
    ogImage: SITE.ogImage,
    ogUrl: `${SITE.url}/contact-us`,
  });

  useHead({
    link: [{ rel: 'canonical', href: `${SITE.url}/contact-us` }],
  });
</script>

<template>
  <section class="w-full py-20">
    <div class="custom-container">
      <h1>Contattaci per richiedere informazioni</h1>
      <FeaturesContactsUs />
    </div>
  </section>
</template>
