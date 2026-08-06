import type { RouteRecordRaw } from 'vue-router'

export const usersRoutes: RouteRecordRaw[] = [
  {
    path: 'users',
    children: [
      {
        path: '',
        name: 'users.index',
        component: () => import('./pages/UsersPage.vue'),
      },
      {
        path: ':id',
        name: 'users.show',
        props: true,
        component: () => import('./pages/UserDetailsPage.vue'),
      },
    ],
  },
]
