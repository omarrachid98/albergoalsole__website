<script setup lang="ts">
  import { SITE } from '~/constants/site';

  useSeoMeta({
    title: `Contattaci | ${SITE.name}`,
    ogTitle: `Contattaci | ${SITE.name}`,
    description: `Contatta l'${SITE.name} per informazioni, prenotazioni e richieste. Siamo a ${SITE.address.locality}, sull'Altopiano di Asiago.`,
    ogDescription: `Contatta l'${SITE.name} per informazioni, prenotazioni e richieste. Siamo a ${SITE.address.locality}, sull'Altopiano di Asiago.`,
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
