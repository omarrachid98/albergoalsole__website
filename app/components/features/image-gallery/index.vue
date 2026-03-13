<template>
  <section class="py-10">
    <div id="content">
      <div ref="scrollSectionRef" class="scroll-section">
        <div ref="cardsContainerRef" class="cards-container">
          <div class="heading flex flex-col items-center justify-center mr-10">
            <h2>Le foto del nostro albergo</h2>
            <NuxtLink to="/gallery">
              <UButton class="rounded-full px-6">
                Vai alla galleria completa
              </UButton>
            </NuxtLink>
          </div>
          <div ref="cardRefs" class="card" v-for="n in 4" :key="n">
            <NuxtImg
              src="/images/home/alsole__home.jpg"
              :alt="`${SITE.name} - Hotel a Lusiana Conco, Altopiano di Asiago - foto ${n}`"
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
