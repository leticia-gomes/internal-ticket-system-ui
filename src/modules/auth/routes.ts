import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '', // Fica vazio porque herda o '/login' do pai
    name: 'auth.login',
    component: () => import('./pages/LoginPage.vue'),
  },
]
