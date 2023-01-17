import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

import publicRoutes from './publicRoutes'

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
    },
    ...publicRoutes
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_PUBLIC_PATH),
  routes: routes,
});

export default router;
