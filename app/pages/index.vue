<template>
  <div>
    <div class="relative w-full h-[85vh] md:h-[90vh] overflow-hidden">
      <NuxtImg
        :src="SITE.heroImage"
        :alt="`${SITE.name} - Hotel e ristorante a ${SITE.address.locality}, Altopiano di Asiago`"
        class="w-full h-full object-cover"
        loading="eager"
        width="1200"
        height="800"
      />
      <div class="absolute inset-0 bg-black/40" />
      <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />

      <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 class="sr-only">{{ SITE.name }} - Hotel e ristorante a {{ SITE.address.locality }}</h1>
        <p class="text-2xl md:text-4xl lg:text-5xl font-bold underline italic text-white drop-shadow-lg max-w-2xl leading-tight">
          Hotel e ristorante a {{ SITE.address.locality }}, sull'Altopiano di Asiago.
        </p>
        <div class="mt-10 flex flex-col sm:flex-row gap-3">
          <a
            href="#contatti"
            @click.prevent="scrollToContatti"
            class="bg-brand hover:bg-brand/90 text-white font-semibold px-10 py-4 text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            Contattaci
          </a>
          <NuxtLink
            to="/gallery"
            class="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-semibold px-10 py-4 text-lg rounded-full border border-white/30 shadow-lg transition-all duration-300 hover:scale-105"
          >
            Scopri l'hotel
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="custom-container my-10">
      <FeaturesWhoWeAre />
      <FeaturesOurServices />
      <FeaturesImageGallery />

      <div id="contatti">
        <h2>Contattaci per prenotazioni e informazioni</h2>
        <FeaturesContactsUs />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { SITE } from '~/constants/site';

  const scrollToContatti = () => {
    document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' });
  };

  useSeoMeta({
    title: `${SITE.name} | Hotel e Ristorante a ${SITE.address.locality} - Altopiano di Asiago`,
    ogTitle: `${SITE.name} | Hotel e Ristorante a ${SITE.address.locality}`,
    description: `${SITE.name}: hotel e ristorante a ${SITE.address.locality} sull'Altopiano di Asiago. Albergo con cucina tradizionale veneta e specialità marocchine, Wi-Fi gratuito, parcheggio e terrazza panoramica. Prenota il tuo soggiorno.`,
    ogDescription: `Hotel e ristorante a ${SITE.address.locality} sull'Altopiano di Asiago. Albergo con cucina tradizionale veneta e specialità marocchine, terrazza panoramica e parcheggio gratuito.`,
    ogType: 'website',
    ogImage: SITE.ogImage,
    ogUrl: SITE.url,
  });

  const addressSchema = {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  };

  const geoSchema = {
    '@type': 'GeoCoordinates',
    latitude: SITE.geo.latitude,
    longitude: SITE.geo.longitude,
  };

  const languagesSchema = [
    { '@type': 'Language', name: 'Italian' },
    { '@type': 'Language', name: 'English' },
    { '@type': 'Language', name: 'Spanish' },
    { '@type': 'Language', name: 'Arabic' },
    { '@type': 'Language', name: 'German' },
    { '@type': 'Language', name: 'French' },
  ];

  useHead({
    link: [{ rel: 'canonical', href: SITE.url }],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LodgingBusiness',
          name: SITE.name,
          alternateName: ['Hotel Al Sole Lusiana', 'Albergo Al Sole Lusiana Conco'],
          description: `Hotel e ristorante a ${SITE.address.locality} sull'Altopiano di Asiago. Albergo 3 stelle con cucina tradizionale veneta e specialità marocchine, Wi-Fi gratuito, parcheggio e terrazza panoramica.`,
          url: SITE.url,
          telephone: `+39 ${SITE.phone}`,
          email: SITE.email,
          address: addressSchema,
          geo: geoSchema,
          image: SITE.ogImage,
          priceRange: SITE.priceRange,
          starRating: {
            '@type': 'Rating',
            ratingValue: String(SITE.starRating),
          },
          numberOfRooms: 10,
          checkinTime: '14:00',
          checkoutTime: '10:00',
          amenityFeature: [
            { '@type': 'LocationFeatureSpecification', name: 'Wi-Fi gratuito', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Parcheggio gratuito', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Bar', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Terrazza panoramica', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Ristorante', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Aria condizionata', value: true },
          ],
          availableLanguage: languagesSchema,
        }),
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Restaurant',
          name: `Ristorante ${SITE.name}`,
          description: `Ristorante dell'${SITE.name} a ${SITE.address.locality}, Altopiano di Asiago. Cucina tradizionale veneta e specialità marocchine con ingredienti freschi e di stagione.`,
          url: SITE.url,
          telephone: `+39 ${SITE.phone}`,
          email: SITE.email,
          address: addressSchema,
          geo: geoSchema,
          image: SITE.ogImage,
          priceRange: SITE.priceRange,
          servesCuisine: ['Cucina tradizionale veneta', 'Cucina marocchina', 'Cucina italiana'],
          acceptsReservations: true,
          availableLanguage: languagesSchema,
        }),
      },
    ],
  });
</script>
