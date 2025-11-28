<template>
  <section ref="servicesRef" class="service-card">
    <h2> I nostri servizi </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <UCard class="bg-white service-card" v-for="service in SERVICES" :key="service.id">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="m-0 text-2xl text-black italic">{{ service.title }}</h3>
            <UBadge color="primary">NuxtUI</UBadge>
          </div>
        </template>

        <div class="space-y-2">
          <p class="text-gray-700 dark:text-gray-300">
            {{ service.description }}
          </p>
        </div>
      </UCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { SERVICES } from "~/constants/services.ts";

onMounted(async () => {
  if (!process.client) return;

  await nextTick();

  const gsapModule = await import('gsap');
  const ScrollTriggerModule = await import('gsap/ScrollTrigger');
  const gsap = gsapModule.default;
  const ScrollTrigger = ScrollTriggerModule.default;

  gsap.registerPlugin(ScrollTrigger);
  let viewport = gsap.matchMedia();
  const cards = gsap.utils.toArray('.service-card');

  viewport.add("(min-width: 800px)", () => {
    cards.forEach((card: any) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 19,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          end: "top 60%",
          scrub: true,
          toggleActions: "play reverse play reverse",
        }
      });
    });
  });
});
</script>