<template>
  <div>
    <div class="relative w-full h-96 md:h-[500px] lg:h-[700px] shadow-lg">
      <img
          src="../assets/images/home/alsole__home.jpg"
          alt="albergo al sole"
          class="w-full h-full object-cover"
      />
    </div>

    <div class="custom-container my-10">
      <WhoWeAre />
      <OurServices />
      <ImageGallery />

      <h2> Contattaci per richiedere informazioni </h2>
      <ContactsUsForm handle-submit="(data) => console.log(data)" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import WhoWeAre from "~/features/who-we-are/who-we-are.vue";
  import OurServices from "~/features/our-services/our-services.vue";
  import ImageGallery from "~/features/image-gallery/image-gallery.vue";
  import ContactsUsForm from "~/features/contacts-us/contacts-us-form.vue";
</script>
