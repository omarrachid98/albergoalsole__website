<template>
  <section class="px-6 py-16 max-w-6xl mx-auto">
    <h1 class="text-4xl font-bold mb-10 text-center">Galleria</h1>
    <div ref="gallery" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
          v-for="(img, i) in images"
          :key="i"
          class="overflow-hidden rounded-xl cursor-pointer"
      >
        <img
            @click="openLightbox(img)"
            :src="img"
            class="w-full h-full object-cover gallery-item"
        />
      </div>
    </div>

    <div v-if="lightboxOpen" class="fixed inset-0 backdrop-blur-md bg-white/10 flex items-center justify-center z-50">
      <div class="relative p-4 flex items-center justify-center">
        <div ref="popupRef" class="relative bg-white p-4 rounded-xl shadow-2xl max-w-2xl w-[90%]">
          <img :src="activeImage" class="w-full h-auto rounded-lg" />
        </div>
        <button @click="closeLightbox" class="absolute top-[-30px] right-5 md:top-0 md:right-0 text-gray-600 backdrop-blur-md cursor-pointer bg-white/70 px-5 py-2 rounded-full shadow-lg">&times;</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const images = [
  'https://picsum.photos/id/1015/800/600',
  'https://picsum.photos/id/1025/800/600',
  'https://picsum.photos/id/1035/800/600',
  'https://picsum.photos/id/1045/800/600',
  'https://picsum.photos/id/1055/800/600',
  'https://picsum.photos/id/1065/800/600'
]

const gallery = ref(null)
const lightboxOpen = ref(false)
const activeImage = ref(null)
const popupRef = ref(null)

function openLightbox(img) {
  activeImage.value = img
  lightboxOpen.value = true
  nextTick(() => {
    if (popupRef.value) {
      gsap.fromTo(popupRef.value,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
      )
    }
  })
}

function closeLightbox() {
  if (popupRef.value) {
    gsap.to(popupRef.value, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => {
        lightboxOpen.value = false
      }
    })
  } else {
    lightboxOpen.value = false
  }
}

onMounted(() => {
  const items = gallery.value.querySelectorAll('.gallery-item')

  // Hover animation
  items.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, { scale: 1.05, duration: 0.4, ease: 'power2.out' })
    })
    item.addEventListener('mouseleave', () => {
      gsap.to(item, { scale: 1, duration: 0.4, ease: 'power2.out' })
    })
  })

  // Scroll animation
  gsap.from(items, {
    scrollTrigger: {
      trigger: gallery.value,
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power2.out',
    stagger: 0.15
  })
})
</script>

<style scoped>
.gallery-item {
  transition: transform 0.3s ease;
}
</style>