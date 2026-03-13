<template>
  <section class="py-10">
    <div id="content">
      <div ref="scrollSectionRef" class="scroll-section">
        <div ref="cardsContainerRef" class="cards-container">
          <div class="heading flex flex-col items-center justify-center mr-10">
            <h2>Le nostre foto</h2>
            <NuxtLink to="/gallery">
              <UButton class="rounded-full px-6">
                Vai alla galleria completa
              </UButton>
            </NuxtLink>
          </div>
          <div ref="cardRefs" class="card" v-for="(img, i) in sliderImages" :key="i">
            <NuxtImg
              :src="img.src"
              :alt="img.alt"
              class="w-full h-full object-cover"
              loading="lazy"
              width="400"
              height="300"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { SITE } from '~/constants/site';

const sliderImages = [
  { src: '/images/gallery/al_sole_front1.jpg', alt: `${SITE.name} - Facciata dell'hotel a ${SITE.address.locality}` },
  { src: '/images/gallery/alsole_ristorante.jpg', alt: `Ristorante dell'${SITE.name} a ${SITE.address.locality}` },
  { src: '/images/gallery/alsole_stanza.jpg', alt: `Camera dell'${SITE.name} - Hotel a ${SITE.address.locality}` },
  { src: '/images/gallery/alsole_terrazza.jpg', alt: `Terrazza dell'${SITE.name} con vista sull'Altopiano di Asiago` },
];

const scrollSectionRef = ref<HTMLElement | null>(null);
const cardsContainerRef = ref<HTMLElement | null>(null);

useGsapOnMount(({ gsap, ScrollTrigger }) => {
  const container = cardsContainerRef.value;
  const section = scrollSectionRef.value;
  if (!container || !section) return;

  const cards = Array.from(container.querySelectorAll('.card')) as HTMLElement[];
  if (!cards.length) return;

  gsap.set(cards[0], { opacity: 1 });

  const totalScroll = container.scrollWidth - window.innerWidth + 50;

  const scrollTrack = gsap.to(container, {
    x: -totalScroll,
    duration: cards.length,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: `+=${totalScroll * 2}`,
      pin: true,
      scrub: true,
    },
  });

  cards.forEach((card) => {
    gsap.to(card, {
      opacity: 1,
      scrollTrigger: {
        trigger: card,
        start: 'left 95%',
        end: 'center 90%',
        scrub: true,
        containerAnimation: scrollTrack,
      },
    });
  });

  return () => ScrollTrigger.getAll().forEach((t) => t.kill());
});
</script>
