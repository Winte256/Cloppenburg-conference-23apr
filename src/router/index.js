import i18n, { getLocale } from '@/langs/i18n';
import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/HomeView.vue';
import LayoutBase from '../views/LayoutBase.vue';

const routes = [
  {
    path: '/:lang',
    component: LayoutBase,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const { lang } = to.params;

  if (!['ru', 'de'].includes(lang)) {
    return next('/ru');
  }

  const currentLocale = getLocale();

  if (currentLocale !== lang) {
    i18n.global.locale.value = lang;
  }

  return next();
});

export default router;
