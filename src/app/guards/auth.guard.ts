import type {
  NavigationGuardNext,
  RouteLocationNormalized
} from 'vue-router'

import { useAuthStore } from '@/modules/auth/stores/auth.store'


export function authGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) {

  const authStore = useAuthStore()


  const requiresAuth = to.matched.some(
    route => route.meta.requiresAuth
  )


  if (requiresAuth && !authStore.isAuthenticated) {
    next('/auth/login')
    return
  }


  if (to.path === '/auth/login' && authStore.isAuthenticated) {
    next('/dashboard')
    return
  }


  next()
}
