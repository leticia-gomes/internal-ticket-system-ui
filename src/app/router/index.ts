import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import AuthLayout from '@/shared/layouts/AuthLayout.vue'
import DefaultLayout from '@/shared/layouts/DefaultLayout.vue'

import { authRoutes } from '@/modules/auth/routes'
import { authGuard } from '@/app/guards/auth.guard'
import { ticketsRoutes } from '@/modules/tickets/routes'
import { usersRoutes } from '@/modules/users/routes'

const routes: RouteRecordRaw[] = [

  {
    path: '/auth', // Alterado para /auth caso queira adicionar /auth/register depois
    component: AuthLayout,
    children: authRoutes,
  },

  {
    path: '/',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/dashboard',
      },

      {
        path: 'dashboard',
        name: 'dashboard',
        component: () =>
          import('@/modules/dashboard/pages/DashboardPage.vue'),
      },

      ...ticketsRoutes,
      ...usersRoutes,
    ],
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/modules/errors/pages/NotFoundPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(authGuard)

export default router
