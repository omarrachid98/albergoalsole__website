<template>
  <UApp>
    <!-- Scroll progress bar -->
    <div
      class="fixed top-0 left-0 h-[3px] bg-brand z-[9999] transition-none"
      :style="{ width: scrollProgress + '%' }"
    />

    <!-- Splash screen: rendered by SSR, visible immediately, fades out after hydration -->
    <Transition name="splash">
      <div
        v-if="showSplash"
        class="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-brand"
      >
        <p class="text-white text-3xl font-extrabold italic tracking-wide mb-8 underline">Albergo Al Sole</p>
        <svg width="40" height="40" viewBox="0 0 40 40" class="animate-spin">
          <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="3" />
          <circle cx="20" cy="20" r="16" fill="none" stroke="white" stroke-width="3"
            stroke-dasharray="80" stroke-dashoffset="60" stroke-linecap="round" />
        </svg>
      </div>
    </Transition>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
const scrollProgress = ref(0);
const showSplash = ref(true);

function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true });

  // Hide splash after hydration is complete
  setTimeout(() => {
    showSplash.value = false;
  }, 600);
});

onUnmounted(() => window.removeEventListener('scroll', updateProgress));
</script>

<style>
.splash-leave-active {
  transition: opacity 0.4s ease;
}
.splash-leave-to {
  opacity: 0;
}
</style>
