<template>
  <section class="px-6 py-16 max-w-6xl mx-auto">
    <h1 class="text-4xl font-bold mb-10 text-center">Galleria</h1>
    <div ref="gallery" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="(img, i) in images"
        :key="i"
        class="overflow-hidden rounded-3xl cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300"
      >
        <NuxtImg
          @click="openLightbox(i)"
          :src="img.src"
          :alt="img.alt"
          class="w-full h-64 object-cover gallery-item transition-transform duration-300 hover:scale-105"
          loading="lazy"
          width="800"
          height="600"
        />
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="lightboxOpen && activeImage"
        role="dialog"
        aria-modal="true"
        aria-label="Visualizzazione immagine"
        class="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50"
        @click.self="closeLightbox"
        @keydown.escape="closeLightbox"
        tabindex="0"
        ref="lightboxRef"
      >
        <div class="relative p-4 flex items-center justify-center">
          <div ref="popupRef" class="relative glass-strong p-4 rounded-3xl shadow-2xl max-w-2xl w-[90vw]">
            <NuxtImg
              :src="activeImage.src"
              :alt="activeImage.alt"
              class="w-full h-auto rounded-2xl"
            />
          </div>
          <button
            @click="closeLightbox"
            aria-label="Chiudi immagine"
            class="absolute -top-4 -right-2 md:top-0 md:-right-4 backdrop-blur-md cursor-pointer
                   bg-white/80 w-10 h-10 rounded-full shadow-lg flex items-center justify-center
                   text-gray-700 hover:bg-white transition-colors text-xl"
          >
            &times;
          </button>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { SITE } from '~/constants/site';

useSeoMeta({
  title: `Galleria | ${SITE.name}`,
  ogTitle: `Galleria | ${SITE.name}`,
  description: `Scopri le foto dell'${SITE.name}: camere, spazi comuni, terrazza panoramica e i paesaggi dell'Altopiano di Asiago.`,
  ogDescription: `Scopri le foto dell'${SITE.name}: camere, spazi comuni, terrazza panoramica e i paesaggi dell'Altopiano di Asiago.`,
  ogImage: SITE.ogImage,
  ogUrl: `${SITE.url}/gallery`,
});

useHead({
  link: [{ rel: 'canonical', href: `${SITE.url}/gallery` }],
});

const images = [
  { src: 'https://picsum.photos/id/1015/800/600', alt: 'Vista panoramica delle montagne' },
  { src: 'https://picsum.photos/id/1025/800/600', alt: 'Paesaggio naturale' },
  { src: 'https://picsum.photos/id/1035/800/600', alt: 'Area relax dell\'hotel' },
  { src: 'https://picsum.photos/id/1045/800/600', alt: 'Spazi comuni dell\'hotel' },
  { src: 'https://picsum.photos/id/1055/800/600', alt: 'Camera dell\'hotel' },
  { src: 'https://picsum.photos/id/1065/800/600', alt: 'Terrazza panoramica' },
];

const gallery = ref<HTMLElement | null>(null);
const lightboxOpen = ref(false);
const activeImage = ref<{ src: string; alt: string } | null>(null);
const popupRef = ref<HTMLElement | null>(null);
const lightboxRef = ref<HTMLElement | null>(null);

async function openLightbox(index: number) {
  activeImage.value = images[index];
  lightboxOpen.value = true;
  await nextTick();
  lightboxRef.value?.focus();

  const { gsap } = await useGsap();
  if (popupRef.value) {
    gsap.fromTo(
      popupRef.value,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
    );
  }
}

async function closeLightbox() {
  const { gsap } = await useGsap();
  if (popupRef.value) {
    gsap.to(popupRef.value, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => {
        lightboxOpen.value = false;
        activeImage.value = null;
      },
    });
  } else {
    lightboxOpen.value = false;
    activeImage.value = null;
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
