import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'auth.index',
    component: () => import('./pages/LoginPage.vue'),
  },
  {
    path: 'login',
    name: 'auth.login',
    component: () => import('./pages/LoginPage.vue'),
  },
]
