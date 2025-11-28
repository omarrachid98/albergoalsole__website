<template>
  <ClientOnly>
    <section class="py-10">
        <div id="content">
          <div class="scroll-section">
            <div class="cards-container">
              <div class="heading flex flex-col items-center justify-center mr-10">
                <h1>
                  Visualizza la nostra galleria
                </h1>
                <UButton>
                  Vai alla galleria completa
                </UButton>
              </div>
              <div class="card">
                <img src="../../assets/images/home/alsole__home.jpg" alt="al_sole" />
              </div>
              <div class="card">
                <img src="../../assets/images/home/alsole__home.jpg" alt="al_sole" />
              </div>
              <div class="card">
                <img src="../../assets/images/home/alsole__home.jpg" alt="al_sole" />
              </div>
              <div class="card">
                <img src="../../assets/images/home/alsole__home.jpg" alt="al_sole" />
              </div>
            </div>
          </div>
        </div>
    </section>
  </ClientOnly>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue';

onMounted(async () => {
  if (!process.client) return;

  await nextTick();

  const gsapModule = await import('gsap');
  const ScrollTriggerModule = await import('gsap/ScrollTrigger');

  const gsap = gsapModule.default;
  const ScrollTrigger = ScrollTriggerModule.default;

  gsap.registerPlugin(ScrollTrigger);

  const cards = gsap.utils.toArray('.card') as Array<any>;
  const cardsContainer = document.querySelector('.cards-container') as HTMLElement;

  gsap.set(cards[0], { opacity: 1 });

  const totalScroll = cardsContainer.scrollWidth - window.innerWidth + 50;

  const scrollTrack = gsap.to(cardsContainer, {
    x: -totalScroll,
    duration: cards.length,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: '.scroll-section',
      start: 'top top',
      end: `+=${totalScroll * 2}`,
      pin: true,
      scrub: true
    }
  });

  cards.forEach(card => {
    gsap.to(card, {
      opacity: 1,
      scrollTrigger: {
        trigger: card,
        start: 'left 95%',
        end: 'center 90%',
        scrub: true,
        containerAnimation: scrollTrack
      }
    });
  });
});
</script>