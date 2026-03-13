<template>
  <div>
    <!-- Hero con bordi morbidi -->
    <div class="relative w-full h-96 md:h-[500px] lg:h-[700px] overflow-hidden rounded-b-2xl">
      <NuxtImg
        :src="SITE.heroImage"
        :alt="`${SITE.name} - Vista esterna`"
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

      <h2>Contattaci per richiedere informazioni</h2>
      <FeaturesContactsUs />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { SITE } from '~/constants/site';

  useSeoMeta({
    title: `${SITE.name} | Hotel a ${SITE.address.locality}, Altopiano di Asiago`,
    ogTitle: `${SITE.name} | Hotel a ${SITE.address.locality}`,
    description: `${SITE.name}: hotel familiare a ${SITE.address.locality} sull'Altopiano di Asiago. Cucina tradizionale, Wi-Fi gratuito, terrazza panoramica. Prenota il tuo soggiorno.`,
    ogDescription: `Hotel familiare a ${SITE.address.locality} sull'Altopiano di Asiago. Cucina tradizionale e specialità marocchine, Wi-Fi gratuito, terrazza panoramica.`,
    ogType: 'website',
    ogImage: SITE.ogImage,
    ogUrl: SITE.url,
  });

  // JSON-LD structured data for LodgingBusiness
  useHead({
    link: [{ rel: 'canonical', href: SITE.url }],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LodgingBusiness',
          name: SITE.name,
          description: `Hotel familiare a ${SITE.address.locality} sull'Altopiano di Asiago. Cucina tradizionale e specialità marocchine, Wi-Fi gratuito, terrazza panoramica.`,
          url: SITE.url,
          telephone: `+39 ${SITE.phone}`,
          email: SITE.email,
          address: {
            '@type': 'PostalAddress',
            streetAddress: SITE.address.street,
            addressLocality: SITE.address.locality,
            addressRegion: SITE.address.region,
            postalCode: SITE.address.postalCode,
            addressCountry: SITE.address.country,
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: SITE.geo.latitude,
            longitude: SITE.geo.longitude,
          },
          image: SITE.ogImage,
          priceRange: SITE.priceRange,
          starRating: {
            '@type': 'Rating',
            ratingValue: String(SITE.starRating),
          },
          amenityFeature: [
            { '@type': 'LocationFeatureSpecification', name: 'Wi-Fi gratuito', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Parcheggio', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Bar', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Terrazza panoramica', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Ristorante', value: true },
          ],
          availableLanguage: [
            { '@type': 'Language', name: 'Italian' },
            { '@type': 'Language', name: 'English' },
            { '@type': 'Language', name: 'Spanish' },
            { '@type': 'Language', name: 'Arabic' },
            { '@type': 'Language', name: 'German' },
            { '@type': 'Language', name: 'French' },
          ],
        }),
      },
    ],
  });
</script>
