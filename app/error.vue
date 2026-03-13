<template>
  <section class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
    <div class="glass bubble p-12 shadow-xl max-w-lg">
      <h1 class="text-6xl font-bold text-brand mb-4">{{ error?.statusCode || 500 }}</h1>
      <h2 class="text-2xl text-gray-800 mb-6">
        {{ error?.statusCode === 404 ? 'Pagina non trovata' : 'Si è verificato un errore' }}
      </h2>
      <p class="text-gray-600 mb-8">
        {{ error?.statusCode === 404
          ? 'La pagina che stai cercando non esiste o è stata spostata.'
          : 'Qualcosa è andato storto. Riprova più tardi.' }}
      </p>
      <NuxtLink to="/">
        <UButton class="rounded-full px-8" size="xl">
          Torna alla Home
        </UButton>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';
import { SITE } from '~/constants/site';

const props = defineProps<{ error: NuxtError }>();

useSeoMeta({
  title: `${props.error?.statusCode === 404 ? 'Pagina non trovata' : 'Errore'} | ${SITE.name}`,
  description: 'La pagina cercata non esiste.',
});

useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
});
</script>
