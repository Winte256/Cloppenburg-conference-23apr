import { createApp } from 'vue';
import Toast from 'vue-toastification';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vue-toastification/dist/index.css';
import i18n from './langs/i18n';

const app = createApp(App);

app.use(i18n).use(store).use(Toast, {}).use(router);

app.config.globalProperties = {
  ...app.config.globalProperties,
  $d: function $date(date, type) {
    const $d = i18n.global.d;
    if (typeof date === 'number') {
      return $d(date, type);
    }

    if (typeof date === 'string') {
      return $d(new Date(date), type);
    }

    console.error('Invalid Date');
    return 'Invalid Date';
  },
  $t: function $t(a, b, c) {
    return i18n.global.t(a, b, c);
  },
};

app.mount('#app');
