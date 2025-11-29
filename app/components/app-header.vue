<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import gsap from "gsap";

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

  if (bubbleAnim) bubbleAnim.kill();
  if (menuAnim) menuAnim.kill();

  if (isMenuOpen.value) {
    bubbleAnim = gsap.fromTo(
        bubbleRef.value,
        { scale: 0.96, rotate: 0 },
        {
          scale: 1,
          rotate: 0,
          duration: 0.22,
          ease: "power2.out"
        }
    );

    menuAnim = gsap.fromTo(
        menuRef.value,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out"
        }
    );
  } else {
    bubbleAnim = gsap.to(bubbleRef.value, {
      scale: 0.97,
      duration: 0.18,
      ease: "power1.inOut"
    });
  }
};

const handleScroll = () => {
  scrolled.value = window.scrollY > 50;
};

onMounted(() => {
  scrolled.value = window.scrollY > 50;
  window.addEventListener("scroll", handleScroll);

  // Logo entry anim super soft
  gsap.from(logoRef.value, {
    opacity: 0,
    y: -10,
    duration: 0.45,
    ease: "power2.out"
  });
});

onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>

<template>
  <ClientOnly>
    <!-- Desktop menu -->
    <header
        :class="[
        'sticky top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out hidden md:block',
        scrolled
          ? 'w-[800px] max-w-[800px] top-5 mx-auto mt-4 rounded-full bg-white/70 backdrop-blur-md py-2 px-6 border-black border'
          : 'w-full bg-transparent px-4 py-6'
      ]"
    >
      <div class="flex items-center justify-between">
        <div class="tracking-wide font-bold italic transition-all duration-500 text-black"
             :class="[scrolled ? 'text-base text-black' : 'text-xl']">
          Albergo Al Sole
        </div>

        <nav
            :class="[
            'flex gap-6 font-medium text-sm transition-all duration-500 text-gray-700',
            scrolled ? 'text-black' : '',
          ]"
        >
          <NuxtLink
              v-for="item in menuItems"
              :key="item.url"
              :to="item.url"
              :class="['transition-colors', scrolled ? 'text-black' : '']"
              exact-active-class="text-gray-800 font-bold underline"
          >
            {{ item.title }}
          </NuxtLink>
        </nav>

        <div class="flex gap-3">
          <div
              :class="[
              'flex items-center justify-center rounded-full font-semibold transition-all duration-500 shadow-md',
              scrolled
                ? 'w-9 h-9 bg-gradient-to-tr from-blue-400/40 to-blue-600/40 text-blue-800'
                : 'w-12 h-12 bg-blue-500/20 text-blue-200'
            ]"
          >
            A
          </div>
          <div
              :class="[
              'flex items-center justify-center rounded-full font-semibold transition-all duration-500 shadow-md',
              scrolled
                ? 'w-9 h-9 bg-gradient-to-tr from-pink-400/40 to-pink-600/40 text-pink-800'
                : 'w-12 h-12 bg-pink-500/20 text-pink-200'
            ]"
          >
            B
          </div>
        </div>
      </div>
    </header>
    <!-- MOBILE MENU -->
    <div
        class="md:hidden fixed top-0 left-0 right-0 z-40 flex justify-center pt-3">
      <div class="flex items-center justify-start w-full px-4">
        <div
            ref="logoRef"
            class="backdrop-blur-md bg-white/70 px-6 py-2 rounded-full shadow-lg"
        >
          <p class="text-lg font-bold italic text-center text-gray-900">Albergo Al Sole</p>
        </div>

        <div class="backdrop-blur-md cursor-pointer bg-white/70 px-6 py-2 rounded-full shadow-lg ml-auto">
          <Icon name="uil:envelopes" size="25" style="color: black" />
        </div>
      </div>
    </div>

    <!-- MOBILE MENU FLOATING BUBBLE -->
    <div class="md:hidden fixed bottom-6 right-6 z-50">
      <button
          ref="bubbleRef"
          @click="onOpenMenu"
          class="backdrop-blur-md bg-white/70 border cursor-pointer
           shadow-xl transition-all duration-300 flex items-center justify-center
           text-black"
          :class="[
      isMenuOpen ? 'w-16 h-16 rounded-2xl' : 'w-16 h-16 rounded-full'
    ]"
      >
        <span v-if="!isMenuOpen" class="text-3xl">☰</span>
        <span v-else class="text-2xl">✕</span>
      </button>

      <!-- Dropdown -->
      <nav
          v-if="isMenuOpen"
          ref="menuRef"
          class="absolute bottom-20 right-0 w-48
           bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-4 flex flex-col gap-3
           border border-black"
      >
        <NuxtLink
            v-for="item in menuItems"
            :key="item.url"
            :to="item.url"
            class="text-gray-800 hover:text-blue-600 font-medium"
            @click="isMenuOpen = false"
        >
          {{ item.title }}
        </NuxtLink>
      </nav>
    </div>
  </ClientOnly>
</template>