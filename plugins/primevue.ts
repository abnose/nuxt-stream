// plugins/primevue.js

// import { defineNuxtPlugin } from '#app';
// import PrimeVue from 'primevue/config';
// import 'primevue/resources/themes/saga-blue/theme.css';  // Choose your theme
// import 'primevue/resources/primevue.min.css';  // Core CSS
// import 'primeicons/primeicons.css';  // Icons

import ToastService from 'primevue/toastservice';

export default defineNuxtPlugin((nuxtApp) => {
    // nuxtApp.vueApp.use(PrimeVue);
    nuxtApp.vueApp.use(ToastService);
});