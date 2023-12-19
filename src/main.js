import { createApp} from 'vue';
import App from './App.vue';
import router from '@/router/router';
import VueCookies from 'vue-cookies'

const app = createApp(App);
app.use(router).use(VueCookies).mount('#app');

