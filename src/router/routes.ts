import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/modules/auth/pages/LoginPage.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/modules/auth/pages/LoginPage.vue'),
      }
    ],
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: 'tickets',
        name: 'Tickets',
        component: () => import('@/modules/tickets/pages/TicketListPage.vue'),
      },

      {
        path: 'tickets/:id',
        name: 'TicketDetails',
        component: () =>
          import(
            '@/modules/tickets/pages/TicketDetailsPage.vue'
          ),
      },
    ],
  },

  {
    path: '/',
    redirect: '/login',
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () =>
      import('@/views/NotFoundView.vue'),
  },
]
