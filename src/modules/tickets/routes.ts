import type { RouteRecordRaw } from 'vue-router'

export const ticketsRoutes: RouteRecordRaw[] = [
  {
    path: 'tickets',
    children: [
      {
        path: '',
        name: 'tickets.index',
        component: () => import('./pages/TicketListPage.vue'),
      },
      {
        path: 'new',
        name: 'tickets.create',
        component: () => import('./pages/TicketCreatePage.vue'),
      },
      {
        path: ':id',
        name: 'tickets.show',
        props: true,
        component: () => import('./pages/TicketDetailsPage.vue'),
      },
      {
        path: ':id/edit',
        name: 'tickets.edit',
        props: true,
        component: () => import('./pages/TicketEditPage.vue'),
      },
    ],
  },
]
