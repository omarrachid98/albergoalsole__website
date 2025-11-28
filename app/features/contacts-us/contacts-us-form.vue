<script setup lang="ts">
  import type { ContactsFormTypes } from "~/types/types";
  import * as v from 'valibot';
  import type { FormError, FormErrorEvent, FormSubmitEvent } from '@nuxt/ui';
  type Schema = v.InferOutput<typeof schema>;

  const props = defineProps<{
    handleSubmit: (formData: ContactsFormTypes) => void;
  }>();

  const schema = v.object({
    name: v.pipe(v.string()),
    surname: v.pipe(v.string()),
    email: v.pipe(v.string(), v.email('Invalid email')),
    message: v.pipe(v.string()),
  });

  const formData: ContactsFormTypes = reactive({
    name: "",
    surname: "",
    email: "",
    message: ""
  })

  const validateForm = (state: Partial<Schema>): FormError[] => {
    const errors: FormError[] = [];
    Object.keys(state).forEach((key: string) => {
      if (formData[key] === '') {
        errors.push({ message: `Questo campo è obbligatorio`, name: key });
      }
    })
    return errors;
  }

  const onSubmit = (event: FormSubmitEvent<Schema>) => {
    props.handleSubmit(event);
  }
</script>

<template>
  <ClientOnly>
    <UForm :validate="validateForm" :state="formData" :schema="schema" class="form-container" @submit="onSubmit">
      <div class="form-control">
        <UFormField name="name" label="Nome" class="w-full" required>
          <UInput
              class="uInput"
              type="text"
              name="name"
              placeholder="Nome"
              size="xl"
              v-model="formData.name"
          />
        </UFormField>
      </div>
      <div class="form-control">
        <UFormField name="surname"  label="Cognome" class="w-full" required>
          <UInput size="xl" class="uInput " type="text" name="surname" placeholder="Cognome" v-model="formData.surname" />
        </UFormField>
      </div>
      <div class="form-control">
        <UFormField label="Email" name="email" class="w-full" required>
          <UInput size="xl" class="uInput" type="email" name="email" placeholder="Inserisci la tua email" v-model="formData.email"  />
        </UFormField>
      </div>
      <div class="form-control">
        <UFormField label="Messaggio" name="message" class="w-full" required>
          <UTextarea size="xl" class="uInput" name="message" placeholder="Inserisci il tuo messaggio" v-model="formData.message" />
        </UFormField>
      </div>
      <div class="form-control cursor-pointer">
        <UCheckbox label="Dichiaro di aver letto e compreso l'informativa sulla privacy" required size="xl" />
      </div>
      <UButton class="button cursor-pointer" type="submit">
        Invia
      </UButton>
    </UForm>
  </ClientOnly>
</template>