import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/router';
import VueCookies from 'vue-cookies'
import Notifications from '@kyvg/vue3-notification'

const app = createApp(App);
app.use(router).use(VueCookies).use(Notifications).mount('#app');
