<template>
  <div class="flex flex-col w-screen min-h-screen relative">
    <AppHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
