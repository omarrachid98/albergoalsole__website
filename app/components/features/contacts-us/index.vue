<script setup lang="ts">
  import type { ContactsFormTypes } from "~/types/types";
  import * as v from 'valibot';
  import type { FormError, FormSubmitEvent } from '@nuxt/ui';
  type Schema = v.InferOutput<typeof schema>;

  const { public: { recaptchaSiteKey } } = useRuntimeConfig();

  const toast = useToast();
  const loading = ref(false);
  const submitted = ref(false);

  const schema = v.object({
    name: v.pipe(v.string(), v.minLength(1, 'Il nome è obbligatorio')),
    surname: v.pipe(v.string(), v.minLength(1, 'Il cognome è obbligatorio')),
    email: v.pipe(v.string(), v.email('Email non valida')),
    message: v.pipe(v.string(), v.minLength(1, 'Il messaggio è obbligatorio')),
  });

  const formData: ContactsFormTypes = reactive({
    name: "",
    surname: "",
    email: "",
    message: "",
  });

  const honeypot = ref('');

  const fieldLabels: Record<string, string> = {
    name: 'Nome',
    surname: 'Cognome',
    email: 'Email',
    message: 'Messaggio',
  };

  const validateForm = (state: Partial<Schema>): FormError[] => {
    const errors: FormError[] = [];
    const fields = ['name', 'surname', 'email', 'message'] as const;
    for (const key of fields) {
      if (!formData[key]?.trim()) {
        errors.push({ message: 'Questo campo è obbligatorio', name: key });
      }
    }
    return errors;
  };

  const showValidationToast = () => {
    const fields = ['name', 'surname', 'email', 'message'] as const;
    const missing = fields.filter((key) => !formData[key]?.trim());

    if (missing.length > 0) {
      const labels = missing.map((key) => fieldLabels[key]);
      toast.add({
        title: 'Campi obbligatori mancanti!',
        description: labels.join(', '),
        color: 'error',
      });
    }
  };

  const resetForm = () => {
    formData.name = '';
    formData.surname = '';
    formData.email = '';
    formData.message = '';
  };

  const onSubmit = async (_event: FormSubmitEvent<Schema>) => {
    loading.value = true;
    try {
      let recaptchaToken = '';
      if (recaptchaSiteKey && window.grecaptcha) {
        try {
          recaptchaToken = await window.grecaptcha.execute(recaptchaSiteKey, { action: 'contact' });
        } catch {
          toast.add({
            title: 'Errore reCAPTCHA',
            description: 'Impossibile verificare che non sei un robot. Ricarica la pagina e riprova.',
            color: 'error',
          });
          loading.value = false;
          return;
        }
      }

      await $fetch('/api/contact', {
        method: 'POST',
        body: { ...formData, website: honeypot.value, recaptchaToken },
      });

      submitted.value = true;
      resetForm();

      toast.add({
        title: 'Messaggio inviato!',
        description: 'Ti risponderemo il prima possibile.',
        color: 'success',
      });
    } catch (error: unknown) {
      const fetchError = error as { data?: { statusMessage?: string } };
      const message = fetchError?.data?.statusMessage || 'Errore durante l\'invio. Riprova più tardi.';
      toast.add({
        title: 'Errore',
        description: message,
        color: 'error',
      });
    } finally {
      loading.value = false;
    }
  };
</script>

<template>
  <div class="bg-white/80 backdrop-blur-md border border-gray-200 rounded-3xl p-8 shadow-lg">
    <div v-if="submitted" class="text-center py-8">
      <div class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
        <Icon name="uil:check" size="32" class="text-green-600" />
      </div>
      <h3 class="text-xl font-semibold text-gray-800 mb-2">Messaggio inviato!</h3>
      <p class="text-gray-600 mb-6">Grazie per averci contattato. Ti risponderemo il prima possibile.</p>
      <UButton class="rounded-full px-8" @click="submitted = false">
        Invia un altro messaggio
      </UButton>
    </div>

    <UForm v-else :validate="validateForm" :state="formData" :schema="schema" class="form-container" @submit="onSubmit">
      <div aria-hidden="true" style="position: absolute; left: -9999px; opacity: 0; height: 0; overflow: hidden;">
        <label for="website">Sito web</label>
        <input id="website" v-model="honeypot" type="text" name="website" tabindex="-1" autocomplete="off" />
      </div>
      <div class="form-control">
        <UFormField name="name" label="Nome" class="w-full" required>
          <UInput
            class="uInput"
            type="text"
            name="name"
            placeholder="Nome"
            size="xl"
            v-model="formData.name"
            :disabled="loading"
          />
        </UFormField>
      </div>
      <div class="form-control">
        <UFormField name="surname" label="Cognome" class="w-full" required>
          <UInput size="xl" class="uInput" type="text" name="surname" placeholder="Cognome" v-model="formData.surname" :disabled="loading" />
        </UFormField>
      </div>
      <div class="form-control">
        <UFormField label="Email" name="email" class="w-full" required>
          <UInput size="xl" class="uInput" type="email" name="email" placeholder="Inserisci la tua email" v-model="formData.email" :disabled="loading" />
        </UFormField>
      </div>
      <div class="form-control">
        <UFormField label="Messaggio" name="message" class="w-full" required>
          <UTextarea size="xl" class="uInput" name="message" placeholder="Inserisci il tuo messaggio" v-model="formData.message" :disabled="loading" />
        </UFormField>
      </div>
      <div class="form-control cursor-pointer">
        <UCheckbox required size="xl" :disabled="loading">
          <template #label>
            <span>
              Dichiaro di aver letto e compreso l'<NuxtLink to="/privacy" target="_blank" class="text-brand hover:underline font-semibold">informativa sulla privacy</NuxtLink>
            </span>
          </template>
        </UCheckbox>
      </div>
      <UButton
        class="rounded-full px-8 cursor-pointer"
        type="submit"
        size="xl"
        :loading="loading"
        :disabled="loading"
        @click="showValidationToast"
      >
        {{ loading ? 'Invio in corso...' : 'Invia messaggio' }}
      </UButton>
    </UForm>
  </div>
</template>
