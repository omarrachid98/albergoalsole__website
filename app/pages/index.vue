<template>
  <div>
    <!-- Hero con bordi morbidi -->
    <div class="relative w-full h-96 md:h-[500px] lg:h-[700px] overflow-hidden rounded-b-2xl">
      <NuxtImg
        :src="SITE.heroImage"
        :alt="`${SITE.name} - Hotel e ristorante a ${SITE.address.locality}, Altopiano di Asiago`"
        class="w-full h-full object-cover"
        loading="eager"
        width="1200"
        height="800"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-gray-50/60 to-transparent" />
    </div>

    <div class="custom-container my-10">
      <FeaturesWhoWeAre />
      <FeaturesOurServices />
      <FeaturesImageGallery />

      <h2>Contatta il nostro hotel per prenotazioni e informazioni</h2>
      <FeaturesContactsUs />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { SITE } from '~/constants/site';

  useSeoMeta({
    title: `${SITE.name} | Hotel e Ristorante a ${SITE.address.locality} - Altopiano di Asiago`,
    ogTitle: `${SITE.name} | Hotel e Ristorante a ${SITE.address.locality}`,
    description: `${SITE.name}: hotel e ristorante a ${SITE.address.locality} sull'Altopiano di Asiago. Albergo con cucina tradizionale veneta e specialità marocchine, Wi-Fi gratuito, parcheggio e terrazza panoramica. Prenota il tuo soggiorno.`,
    ogDescription: `Hotel e ristorante a ${SITE.address.locality} sull'Altopiano di Asiago. Albergo con cucina tradizionale veneta e specialità marocchine, terrazza panoramica e parcheggio gratuito.`,
    ogType: 'website',
    ogImage: SITE.ogImage,
    ogUrl: SITE.url,
  });

  // JSON-LD structured data: LodgingBusiness + Restaurant
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
