<template>
  <ClientOnly>
    <footer class="bg-[#CC7722] text-white py-10">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

          <div class="footer-col flex flex-col items-center">
            <h3 class="text-2xl font-bold mb-4 italic text-black">Albergo al Sole</h3>
            <p>Dal 1985, accoglienza e comfort nel cuore della città.</p>
            <p class="mt-2 text-gray-400">&copy; {{ new Date().getFullYear() }} Albergo al Sole.</p>
          </div>

          <div class="footer-col flex flex-col items-center">
            <h4 class="text-lg font-semibold mb-4 text-black">Contatti</h4>
            <ul class="text-black space-y-2">
              <li>📍 Via VII Comuni 2, Lusiana Conco (VI)</li>
              <li>📞 +0424 406004</li>
              <li>✉️ info@albergoalsolelusiana.it</li>
            </ul>
          </div>

          <div class="footer-col flex flex-col items-center">
            <h4 class="text-lg font-semibold mb-4 text-black">Scopri</h4>
            <ul class="space-y-2 text-black">
              <li><a href="#">Home</a></li>
              <li><a href="#">Camere</a></li>
              <li><a href="#">Servizi</a></li>
              <li><a href="#">Contatti</a></li>
            </ul>
          </div>

        </div>
    </footer>
  </ClientOnly>
</template>

<script setup lang="ts">
</script>