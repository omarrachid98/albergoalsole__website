<script setup lang="ts">
  import ContactsUsForm from "~/features/contacts-us/contacts-us-form.vue";
  import { ContactsFormTypes } from "~/types/types.ts";

  const onSubmit = (formData: ContactsFormTypes) => {
    console.log("Form submitted:", formData);
  }
</script>

<template>
  <section class="w-full py-20">
    <div class="custom-container">
      <h1>Contattaci per richiedere informazioni</h1>
      <UCard class="bg-transparent w-full">
        <ContactsUsForm :handleSubmit="onSubmit" />
      </UCard>
    </div>
  </section>
</template>