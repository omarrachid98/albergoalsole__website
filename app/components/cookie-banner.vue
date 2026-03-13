<script setup lang="ts">
const accepted = ref(true); // default true to avoid flash on SSR

onMounted(() => {
  accepted.value = localStorage.getItem('cookie-consent') === 'true';
});

const accept = () => {
  localStorage.setItem('cookie-consent', 'true');
  accepted.value = true;
};
</script>

<template>
  <Transition name="cookie-banner">
    <div
      v-if="!accepted"
      class="fixed bottom-0 left-0 right-0 z-[9998] p-4 md:p-0"
    >
      <div
        class="max-w-xl mx-auto mb-4 md:mb-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 px-6 py-4 flex flex-col sm:flex-row items-center gap-4"
      >
        <p class="text-sm text-gray-700 text-center sm:text-left">
          Questo sito utilizza solo cookie tecnici necessari al funzionamento.
          <NuxtLink to="/privacy" class="text-brand underline hover:text-brand/80">Privacy policy</NuxtLink>
        </p>
        <button
          @click="accept"
          class="shrink-0 bg-brand hover:bg-brand/90 text-white font-semibold px-6 py-2 rounded-full shadow transition-all duration-200 hover:scale-105 cursor-pointer"
        >
          OK
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.cookie-banner-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.cookie-banner-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.cookie-banner-enter-from,
.cookie-banner-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
