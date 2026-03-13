<script setup lang="ts">
import { SITE } from '~/constants/site';

useSeoMeta({
  title: `Informativa sulla Privacy | ${SITE.name} - Hotel a ${SITE.address.locality}`,
  ogTitle: `Informativa sulla Privacy | ${SITE.name}`,
  description: `Informativa sulla privacy dell'${SITE.name}, hotel e ristorante a ${SITE.address.locality}. Scopri come trattiamo i tuoi dati personali ai sensi del GDPR.`,
  ogDescription: `Informativa sulla privacy dell'${SITE.name}. Scopri come trattiamo i tuoi dati personali.`,
  ogImage: SITE.ogImage,
  ogUrl: `${SITE.url}/privacy`,
});

useHead({
  link: [{ rel: 'canonical', href: `${SITE.url}/privacy` }],
});
</script>

<template>
  <section class="w-full py-20">
    <div class="custom-container max-w-3xl">
      <h1>Informativa sulla Privacy</h1>

      <div class="glass bubble p-8 shadow-lg space-y-6 text-gray-700">
        <div>
          <h3 class="text-lg font-semibold text-black mb-2">1. Titolare del trattamento</h3>
          <p>
            Il titolare del trattamento dei dati personali è <strong>{{ SITE.name }}</strong>,
            con sede in {{ SITE.address.full }}.
          </p>
          <p class="mt-1">
            Email: <a :href="`mailto:${SITE.email}`" class="text-brand hover:underline">{{ SITE.email }}</a><br>
            Telefono: <a :href="`tel:${SITE.phoneFull}`" class="text-brand hover:underline">{{ SITE.phone }}</a>
          </p>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-black mb-2">2. Dati raccolti</h3>
          <p>
            Attraverso il modulo di contatto presente sul sito, raccogliamo i seguenti dati
            forniti volontariamente dall'utente:
          </p>
          <ul class="list-disc list-inside mt-2 space-y-1">
            <li>Nome e cognome</li>
            <li>Indirizzo email</li>
            <li>Contenuto del messaggio</li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-black mb-2">3. Finalità del trattamento</h3>
          <p>I dati personali sono trattati per le seguenti finalità:</p>
          <ul class="list-disc list-inside mt-2 space-y-1">
            <li>Rispondere alle richieste di informazioni e prenotazioni inviate tramite il modulo di contatto</li>
            <li>Gestire la comunicazione con gli ospiti e potenziali clienti</li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-black mb-2">4. Base giuridica</h3>
          <p>
            Il trattamento dei dati è basato sul consenso dell'utente (art. 6, par. 1, lett. a
            del Regolamento UE 2016/679 - GDPR) e sulla necessità di rispondere alle richieste
            ricevute (art. 6, par. 1, lett. b del GDPR).
          </p>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-black mb-2">5. Conservazione dei dati</h3>
          <p>
            I dati personali raccolti tramite il modulo di contatto saranno conservati per il
            tempo necessario a rispondere alla richiesta e, successivamente, per un periodo
            massimo di 12 mesi, salvo obblighi di legge.
          </p>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-black mb-2">6. Condivisione dei dati</h3>
          <p>
            I dati personali non saranno comunicati a terzi, salvo obblighi di legge.
            I dati sono trattati esclusivamente dal personale autorizzato dell'hotel.
          </p>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-black mb-2">7. Diritti dell'interessato</h3>
          <p>
            In conformità al GDPR, l'utente ha diritto di:
          </p>
          <ul class="list-disc list-inside mt-2 space-y-1">
            <li>Accedere ai propri dati personali</li>
            <li>Richiedere la rettifica o la cancellazione dei dati</li>
            <li>Limitare o opporsi al trattamento</li>
            <li>Revocare il consenso in qualsiasi momento</li>
            <li>Presentare reclamo all'autorità di controllo (Garante per la protezione dei dati personali)</li>
          </ul>
          <p class="mt-2">
            Per esercitare i propri diritti, scrivere a
            <a :href="`mailto:${SITE.email}`" class="text-brand hover:underline">{{ SITE.email }}</a>.
          </p>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-black mb-2">8. Cookie</h3>
          <p>
            Questo sito utilizza esclusivamente cookie tecnici necessari al corretto
            funzionamento del sito. Non vengono utilizzati cookie di profilazione o di
            terze parti a scopo pubblicitario.
          </p>
        </div>

        <p class="text-sm text-gray-500 pt-4 border-t border-gray-200">
          Ultimo aggiornamento: marzo 2026
        </p>
      </div>
    </div>
  </section>
</template>
