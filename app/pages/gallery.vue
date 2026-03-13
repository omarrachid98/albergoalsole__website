<template>
  <section class="px-4 md:px-6 py-16 max-w-6xl mx-auto">
    <h1 class="text-4xl font-bold mb-4 text-center">Galleria</h1>
    <p class="text-center text-gray-500 mb-12 max-w-lg mx-auto">Scopri gli spazi del nostro hotel e ristorante a Lusiana Conco, sull'Altopiano di Asiago</p>

    <div ref="gallery" class="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[180px] gap-3 md:gap-4">
      <div
        v-for="(img, i) in images"
        :key="i"
        class="overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 group"
        :class="img.span"
        @click="openLightbox(i)"
      >
        <div class="relative overflow-hidden w-full h-full">
          <NuxtImg
            :src="img.src"
            :alt="img.alt"
            class="w-full h-full object-cover gallery-item transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            width="800"
            height="600"
          />
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end">
            <span class="text-white text-sm font-medium px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow">
              {{ img.label }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="lightboxOpen && activeImage"
        role="dialog"
        aria-modal="true"
        aria-label="Visualizzazione immagine"
        class="fixed inset-0 backdrop-blur-md bg-black/50 flex items-center justify-center z-50"
        @click.self="closeLightbox"
        @keydown.escape="closeLightbox"
        @keydown.left="prevImage"
        @keydown.right="nextImage"
        tabindex="0"
        ref="lightboxRef"
      >
        <div class="relative p-4 flex items-center justify-center max-w-3xl w-[92vw]">
          <div ref="popupRef" class="relative glass-strong p-3 rounded-2xl shadow-2xl w-full">
            <NuxtImg
              :src="activeImage.src"
              :alt="activeImage.alt"
              class="w-full h-auto rounded-xl"
            />
            <p class="text-center text-sm text-gray-600 mt-3 mb-1">{{ activeImage.label }}</p>
          </div>

          <button
            @click="closeLightbox"
            aria-label="Chiudi immagine"
            class="absolute -top-2 -right-2 md:-top-4 md:-right-4 backdrop-blur-md cursor-pointer
                   bg-white/80 w-9 h-9 rounded-full shadow-lg flex items-center justify-center
                   text-gray-700 hover:bg-white transition-colors text-lg"
          >
            &times;
          </button>

          <button
            @click="prevImage"
            aria-label="Immagine precedente"
            class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 backdrop-blur-md cursor-pointer
                   bg-white/80 w-9 h-9 rounded-full shadow-lg flex items-center justify-center
                   text-gray-700 hover:bg-white transition-colors"
          >
            &#8249;
          </button>

          <button
            @click="nextImage"
            aria-label="Immagine successiva"
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 backdrop-blur-md cursor-pointer
                   bg-white/80 w-9 h-9 rounded-full shadow-lg flex items-center justify-center
                   text-gray-700 hover:bg-white transition-colors"
          >
            &#8250;
          </button>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { SITE } from '~/constants/site';

useSeoMeta({
  title: `Galleria Fotografica | ${SITE.name} - Hotel a ${SITE.address.locality}`,
  ogTitle: `Galleria | ${SITE.name}`,
  description: `Galleria fotografica dell'${SITE.name}, hotel e ristorante a ${SITE.address.locality}. Scopri le camere, il ristorante, la terrazza panoramica e i paesaggi dell'Altopiano di Asiago.`,
  ogDescription: `Scopri le foto dell'${SITE.name}: camere, ristorante, terrazza panoramica e i paesaggi dell'Altopiano di Asiago.`,
  ogImage: SITE.ogImage,
  ogUrl: `${SITE.url}/gallery`,
});

useHead({
  link: [{ rel: 'canonical', href: `${SITE.url}/gallery` }],
});

const images = [
  { src: '/images/gallery/al_sole_front1.jpg', alt: `${SITE.name} - Facciata dell'hotel a ${SITE.address.locality}`, label: 'Facciata', span: 'col-span-2 row-span-2' },
  { src: '/images/gallery/alsole_ristorante.jpg', alt: `Ristorante dell'${SITE.name} a ${SITE.address.locality}`, label: 'Ristorante', span: 'row-span-3' },
  { src: '/images/gallery/alsole_bar.jpg', alt: `Bar dell'${SITE.name}`, label: 'Bar', span: 'row-span-1' },
  { src: '/images/gallery/alsole_terrazza.jpg', alt: `Terrazza dell'${SITE.name} con vista sull'Altopiano di Asiago`, label: 'Terrazza panoramica', span: 'row-span-1' },
  { src: '/images/gallery/alsole_ristorante2.jpg', alt: `Sala ristorante dell'${SITE.name}`, label: 'Sala ristorante', span: 'col-span-2 row-span-1' },
  { src: '/images/gallery/alsole_bar2.jpg', alt: `Area bar dell'hotel a ${SITE.address.locality}`, label: 'Area bar', span: 'row-span-1' },
  { src: '/images/gallery/alsole_stanza.jpg', alt: `Camera dell'${SITE.name} - Hotel a ${SITE.address.locality}`, label: 'Camera', span: 'row-span-3' },
  { src: '/images/gallery/alsole_stanza2.jpg', alt: `Camera doppia dell'${SITE.name}`, label: 'Camera doppia', span: 'col-span-2 row-span-2' },
  { src: '/images/gallery/alsole_stanza3.jpg', alt: `Camera dell'albergo a ${SITE.address.locality}`, label: 'Camera', span: 'row-span-3' },
  { src: '/images/gallery/alsole_stanza4.jpg', alt: `Camera con vista dell'${SITE.name}`, label: 'Camera con vista', span: 'row-span-1' },
  { src: '/images/gallery/alsole_stanza5.jpg', alt: `Camera dell'hotel sull'Altopiano di Asiago`, label: 'Camera', span: 'row-span-1' },
  { src: '/images/gallery/alsole_stanza7.jpg', alt: `Camera accogliente dell'${SITE.name}`, label: 'Camera', span: 'col-span-2 row-span-2' },
  { src: '/images/gallery/alsole_stanza8.jpg', alt: `Camera arredata dell'${SITE.name} a ${SITE.address.locality}`, label: 'Camera', span: 'row-span-3' },
  { src: '/images/gallery/alsole_bagno.jpg', alt: `Bagno dell'${SITE.name}`, label: 'Bagno', span: 'row-span-1' },
  { src: '/images/gallery/alsole_bagno3.jpg', alt: `Bagno con doccia dell'hotel a ${SITE.address.locality}`, label: 'Bagno con doccia', span: 'row-span-1' },
  { src: '/images/gallery/alsole_parcheggio.jpg', alt: `Parcheggio gratuito dell'${SITE.name}`, label: 'Parcheggio', span: 'col-span-2 row-span-1' },
];

const gallery = ref<HTMLElement | null>(null);
const lightboxOpen = ref(false);
const activeIndex = ref(0);
const activeImage = computed(() => lightboxOpen.value ? images[activeIndex.value] : null);
const popupRef = ref<HTMLElement | null>(null);
const lightboxRef = ref<HTMLElement | null>(null);

async function openLightbox(index: number) {
  activeIndex.value = index;
  lightboxOpen.value = true;
  await nextTick();
  lightboxRef.value?.focus();

  const { gsap } = await useGsap();
  if (popupRef.value) {
    gsap.fromTo(
      popupRef.value,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' }
    );
  }
}

function prevImage() {
  activeIndex.value = (activeIndex.value - 1 + images.length) % images.length;
}

function nextImage() {
  activeIndex.value = (activeIndex.value + 1) % images.length;
}

async function closeLightbox() {
  const { gsap } = await useGsap();
  if (popupRef.value) {
    gsap.to(popupRef.value, {
      opacity: 0,
      scale: 0.9,
      duration: 0.25,
      ease: 'power3.in',
      onComplete: () => {
        lightboxOpen.value = false;
      },
    });
  } else {
    lightboxOpen.value = false;
  }
}

useGsapOnMount(({ gsap, ScrollTrigger }) => {
  if (!gallery.value) return;
  const items = gallery.value.querySelectorAll('.gallery-item');

  gsap.from(items, {
    scrollTrigger: {
      trigger: gallery.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power2.out',
    stagger: 0.15,
  });
});
</script>
