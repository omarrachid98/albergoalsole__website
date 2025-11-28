<template>
  <div className="flex flex-col w-screen min-h-screen relative">
  <AppHeader />
  <UApp>
    <main className="flex-grow">
      <NuxtPage />
    </main>
  </UApp>
  <Footer />
  </div>
</template>
<script setup lang="ts">
  import Footer from "~/components/footer.vue";
</script>