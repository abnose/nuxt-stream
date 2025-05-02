import tailwindcss from "@tailwindcss/vite";
import Aura from '@primeuix/themes/aura';

import { definePreset } from '@primeuix/themes';
const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{sky.50}',
      100: '{sky.100}',
      200: '{sky.200}',
      300: '{sky.300}',
      400: '{sky.400}',
      500: '{sky.500}',
      600: '{sky.600}',
      700: '{sky.700}',
      800: '{sky.800}',
      900: '{sky.900}',
      950: '{sky.950}'
    }
  }
});

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', 'primeicons/primeicons.css'],
  modules: [
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@nuxt/eslint',
    '@primevue/nuxt-module',
    '@pinia/nuxt'
  ],
  primevue: {
    autoImport: true,
    options: {
      ripple: true,
      inputVariant: 'filled',
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: 'false',
          cssLayer: false,
        }
      }
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
      { src: '~/server/plugins/db.ts', mode: 'server' },
    ],
  },
})