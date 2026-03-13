<template>
  <section ref="servicesRef">
    <h2>I nostri servizi</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <div
        v-for="service in SERVICES"
        :key="service.id"
        class="service-card glass bubble p-6 shadow-lg hover:shadow-2xl hover:bg-white/80
               transition-all duration-300 hover:scale-[1.02] cursor-default"
      >
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-full bg-brand/15 flex items-center justify-center">
            <Icon v-if="service.icon" :name="service.icon" size="24" class="text-brand" />
          </div>
          <h3 class="m-0 text-xl text-black font-semibold">{{ service.title }}</h3>
        </div>
        <p class="text-gray-600">
          {{ service.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { SERVICES } from "~/constants/services";

const servicesRef = ref<HTMLElement | null>(null);

useGsapOnMount(({ gsap, ScrollTrigger }) => {
  const viewport = gsap.matchMedia();
  const cards = servicesRef.value?.querySelectorAll('.service-card');
  if (!cards?.length) return;

  viewport.add("(min-width: 800px)", () => {
    cards.forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          end: "top 60%",
          scrub: true,
          toggleActions: "play reverse play reverse",
        },
      });
    });
  });

  return () => viewport.revert();
});
</script>
