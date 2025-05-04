import tailwindcss from "@tailwindcss/vite";
import Aura from "@primeuix/themes/aura";

import { definePreset } from "@primeuix/themes";
const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{sky.50}",
      100: "{sky.100}",
      200: "{sky.200}",
      300: "{sky.300}",
      400: "{sky.400}",
      500: "{sky.500}",
      600: "{sky.600}",
      700: "{sky.700}",
      800: "{sky.800}",
      900: "{sky.900}",
      950: "{sky.950}",
    },
    colorScheme: {
      light: {
        surface: {
          50: "{sky.50}",
          100: "{sky.100}",
          200: "{sky.200}",
          300: "{sky.300}",
          400: "{sky.400}",
          500: "{sky.500}",
          600: "{sky.600}",
          700: "{sky.700}",
          800: "{sky.800}",
          900: "{sky.900}",
          950: "{sky.950}",
        },
      },
      dark: {
        surface: {
          0: "#ffffff",
          50: "{slate.50}",
          100: "{slate.100}",
          200: "{slate.200}",
          300: "{slate.300}",
          400: "{slate.400}",
          500: "{slate.500}",
          600: "{slate.600}",
          700: "{slate.700}",
          800: "{slate.800}",
          900: "{slate.900}",
          950: "{slate.950}",
        },
      },
    },
  },
  components: {
    card: {
      colorScheme: {
        light: {
          root: {
            background: "{surface.0}",
            color: "{surface.700}",
          },
          subtitle: {
            color: "{surface.500}",
          },
        },
        dark: {
          root: {
            background: "{surface.900}",
            color: "{surface.0}",
          },
          subtitle: {
            color: "{surface.400}",
          },
        },
      },
    },
  },
});

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css", "primeicons/primeicons.css"],
  modules: [
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxt/content",
    "@nuxt/icon",
    "@nuxt/scripts",
    "@nuxt/ui",
    "@nuxt/eslint",
    "@primevue/nuxt-module",
    "@pinia/nuxt",
  ],
  primevue: {
    autoImport: true,
    options: {
      ripple: true,
      inputVariant: "filled",
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: "my-app-dark",
          cssLayer: false,
        },
      },
    },
  },
  vite: {
    plugins: [tailwindcss(), { src: "~/server/plugins/db.ts", mode: "server" }],
  },
});
