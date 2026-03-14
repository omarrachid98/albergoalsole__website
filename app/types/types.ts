export interface ServicesTypes {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export interface ContactsFormTypes {
  name: string;
  email: string;
  surname: string;
  message: string;
}

// Google reCAPTCHA v3
declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}
