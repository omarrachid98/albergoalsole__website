<script setup lang="ts">
import { SITE } from '~/constants/site';
</script>

<template>
  <footer class="bg-brand/95 backdrop-blur-md text-white py-12 mt-16 rounded-t-[3rem]">
    <div class="custom-container grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

      <!-- Brand -->
      <div class="flex flex-col items-center">
        <h3 class="text-2xl font-bold mb-4 italic text-white">{{ SITE.name }}</h3>
        <p class="text-white">Dal {{ SITE.since }}, accoglienza e comfort nel cuore dell'Altopiano di Asiago.</p>
        <p class="mt-2 text-white/70">&copy; {{ new Date().getFullYear() }} {{ SITE.name }}. Tutti i diritti riservati.</p>
      </div>

      <!-- Contatti -->
      <div class="flex flex-col items-center">
        <h4 class="text-lg font-semibold mb-4 text-white">Contatti</h4>
        <ul class="text-white space-y-2">
          <li class="flex items-center gap-2 justify-center">
            <Icon name="uil:map-marker" size="18" aria-hidden="true" />
            <span>{{ SITE.address.full }}</span>
          </li>
          <li class="flex items-center gap-2 justify-center">
            <Icon name="uil:phone" size="18" aria-hidden="true" />
            <a :href="`tel:${SITE.phoneFull}`" class="hover:text-white/80 transition-colors">{{ SITE.phone }}</a>
          </li>
          <li class="flex items-center gap-2 justify-center">
            <Icon name="uil:envelope" size="18" aria-hidden="true" />
            <a :href="`mailto:${SITE.email}`" class="hover:text-white/80 transition-colors">{{ SITE.email }}</a>
          </li>
        </ul>
      </div>

      <!-- Links -->
      <div class="flex flex-col items-center">
        <h4 class="text-lg font-semibold mb-4 text-white">Scopri</h4>
        <ul class="space-y-2 text-white">
          <li><NuxtLink to="/" class="hover:text-white/80 transition-colors">Home</NuxtLink></li>
          <li><NuxtLink to="/gallery" class="hover:text-white/80 transition-colors">Galleria</NuxtLink></li>
          <li><NuxtLink to="/contact-us" class="hover:text-white/80 transition-colors">Contatti</NuxtLink></li>
          <li><NuxtLink to="/privacy" class="hover:text-white/80 transition-colors">Privacy</NuxtLink></li>
        </ul>
      </div>

    </div>
  </footer>
</template>
