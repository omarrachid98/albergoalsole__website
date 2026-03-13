let gsapInstance: typeof import('gsap').default | null = null;
let scrollTriggerInstance: typeof import('gsap/ScrollTrigger').default | null = null;

export async function useGsap() {
  if (!gsapInstance) {
    const gsapModule = await import('gsap');
    const scrollTriggerModule = await import('gsap/ScrollTrigger');

    gsapInstance = gsapModule.default;
    scrollTriggerInstance = scrollTriggerModule.default;

    gsapInstance.registerPlugin(scrollTriggerInstance);
  }

  return {
    gsap: gsapInstance,
    ScrollTrigger: scrollTriggerInstance!,
  };
}

/**
 * Run GSAP animations safely inside onMounted.
 * Handles lazy-loading and provides cleanup via onUnmounted.
 */
export function useGsapOnMount(
  callback: (ctx: { gsap: typeof import('gsap').default; ScrollTrigger: typeof import('gsap/ScrollTrigger').default }) => void | (() => void)
) {
  let cleanup: (() => void) | void;

  onMounted(async () => {
    await nextTick();
    const ctx = await useGsap();
    cleanup = callback(ctx);
  });

  onUnmounted(() => {
    if (typeof cleanup === 'function') cleanup();
  });
}
