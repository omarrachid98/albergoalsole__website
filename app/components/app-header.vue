<script setup lang="ts">
import { SITE } from '~/constants/site';

const menuItems = [
  { title: "Home", url: "/" },
  { title: "Contattaci", url: "/contact-us" },
  { title: "Galleria", url: "/gallery" },
];

const scrolled = ref(false);
const isMenuOpen = ref(false);

const bubbleRef = ref<HTMLElement | null>(null);
const menuRef = ref<HTMLElement | null>(null);
const logoRef = ref<HTMLElement | null>(null);

let bubbleAnim: gsap.core.Tween | null = null;
let menuAnim: gsap.core.Tween | null = null;

const onOpenMenu = async () => {
  isMenuOpen.value = !isMenuOpen.value;
  await nextTick();

  const { gsap } = await useGsap();

  if (bubbleAnim) bubbleAnim.kill();
  if (menuAnim) menuAnim.kill();

  if (isMenuOpen.value) {
    bubbleAnim = gsap.fromTo(
      bubbleRef.value,
      { scale: 0.96, rotate: 0 },
      { scale: 1, rotate: 0, duration: 0.22, ease: "power2.out" }
    );
    menuAnim = gsap.fromTo(
      menuRef.value,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
    );
  } else {
    bubbleAnim = gsap.to(bubbleRef.value, {
      scale: 0.97,
      duration: 0.18,
      ease: "power1.inOut",
    });
  }
};

const handleScroll = () => {
  scrolled.value = window.scrollY > 50;
};

onMounted(async () => {
  scrolled.value = window.scrollY > 50;
  window.addEventListener("scroll", handleScroll);

  const { gsap } = await useGsap();
  gsap.from(logoRef.value, {
    opacity: 0,
    y: -10,
    duration: 0.45,
    ease: "power2.out",
  });
});

onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>

<template>
  <!-- Desktop top info bar -->
  <div
    :class="[
      'hidden md:block w-full bg-brand text-white text-sm transition-all duration-500 overflow-hidden',
      scrolled ? 'max-h-0 opacity-0' : 'max-h-14 opacity-100'
    ]"
  >
    <div class="max-w-[1440px] mx-auto px-4 py-2.5 flex items-center justify-between">
      <a
        :href="SITE.mapsUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-full px-3.5 py-1.5 transition-all duration-200"
      >
        <Icon name="uil:map-marker" size="15" class="shrink-0" aria-hidden="true" />
        <span class="font-semibold">{{ SITE.address.full }}</span>
      </a>
      <div class="flex items-center gap-2">
        <a
          :href="`tel:${SITE.phoneFull}`"
          class="group flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-full px-3.5 py-1.5 transition-all duration-200"
        >
          <Icon name="uil:phone" size="15" class="shrink-0" aria-hidden="true" />
          <span class="font-semibold">{{ SITE.phone }}</span>
        </a>
        <a
          :href="`mailto:${SITE.email}`"
          class="group flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-full px-3.5 py-1.5 transition-all duration-200"
        >
          <Icon name="uil:envelope" size="15" class="shrink-0" aria-hidden="true" />
          <span class="font-semibold">{{ SITE.email }}</span>
        </a>
      </div>
    </div>
  </div>

  <!-- Desktop header -->
  <header
    :class="[
      'sticky top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out hidden md:block',
      scrolled
        ? 'w-[800px] max-w-[800px] top-5 mx-auto mt-4 rounded-full bg-white/60 backdrop-blur-md py-2 px-6 border border-white/30 shadow-xl'
        : 'w-full bg-transparent px-4 py-6'
    ]"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <NuxtLink
          to="/"
          ref="logoRef"
          class="tracking-wide font-bold italic transition-all duration-500 text-black"
          :class="[scrolled ? 'text-base' : 'text-xl']"
        >
          {{ SITE.name }}
        </NuxtLink>

        <!-- Location pin (visible only when scrolled) -->
        <a
          v-if="scrolled"
          :href="SITE.mapsUrl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Dove siamo - Lusiana Conco"
          class="flex items-center gap-1 text-xs text-gray-500 hover:text-brand transition-colors"
        >
          <Icon name="uil:map-marker" size="14" aria-hidden="true" />
          <span>{{ SITE.address.locality }}</span>
        </a>
      </div>

      <nav
        aria-label="Navigazione principale"
        :class="[
          'flex gap-6 font-medium text-sm transition-all duration-500',
          scrolled ? 'text-gray-900' : 'text-gray-800'
        ]"
      >
        <NuxtLink
          v-for="item in menuItems"
          :key="item.url"
          :to="item.url"
          class="transition-colors hover:text-black"
          exact-active-class="text-black font-bold underline"
        >
          {{ item.title }}
        </NuxtLink>
      </nav>
    </div>
  </header>

  <!-- Mobile top bar -->
  <div class="md:hidden fixed top-0 left-0 right-0 z-40 flex justify-center pt-3">
    <div class="flex items-center justify-start w-full px-4 gap-2">
      <NuxtLink
        to="/"
        class="backdrop-blur-md bg-white/70 px-6 py-2 rounded-full shadow-lg"
      >
        <p class="text-lg font-bold italic text-center text-gray-900">{{ SITE.name }}</p>
      </NuxtLink>

      <div class="ml-auto flex items-center gap-2">
        <!-- Location pill -->
        <a
          :href="SITE.mapsUrl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Dove siamo - Lusiana Conco"
          class="backdrop-blur-md bg-white/70 px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5"
        >
          <Icon name="uil:map-marker" size="20" class="text-brand" aria-hidden="true" />
          <span class="text-sm font-medium text-gray-900 hidden min-[400px]:inline">Dove siamo</span>
        </a>

        <NuxtLink
          to="/contact-us"
          aria-label="Contattaci"
          class="backdrop-blur-md cursor-pointer bg-white/70 px-4 py-2 rounded-full shadow-lg"
        >
          <Icon name="uil:envelopes" size="20" class="text-brand" aria-hidden="true" />
        </NuxtLink>
      </div>
    </div>
  </div>

  <!-- Mobile floating bubble -->
  <div class="md:hidden fixed bottom-6 right-6 z-50">
    <button
      ref="bubbleRef"
      @click="onOpenMenu"
      :aria-expanded="isMenuOpen"
      aria-label="Menu di navigazione"
      class="backdrop-blur-md bg-white/70 border border-white/30 cursor-pointer
        shadow-xl transition-all duration-300 flex items-center justify-center
        text-brand"
      :class="[isMenuOpen ? 'w-16 h-16 rounded-2xl' : 'w-16 h-16 rounded-full']"
    >
      <span v-if="!isMenuOpen" class="text-3xl leading-none">&#9776;</span>
      <span v-else class="text-2xl leading-none">&#10005;</span>
    </button>

    <!-- Dropdown nav -->
    <nav
      v-if="isMenuOpen"
      ref="menuRef"
      aria-label="Menu mobile"
      class="absolute bottom-20 right-0 w-48
        bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-4 flex flex-col gap-3
        border border-white/30"
    >
      <NuxtLink
        v-for="item in menuItems"
        :key="item.url"
        :to="item.url"
        class="text-gray-800 hover:text-black font-medium transition-colors"
        @click="isMenuOpen = false"
      >
        {{ item.title }}
      </NuxtLink>
    </nav>
  </div>
</template>
