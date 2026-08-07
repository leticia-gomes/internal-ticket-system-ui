import { defineStore } from 'pinia'

import type { User } from '../types/user.type'
import { getUsers } from '../services/user.service'

interface UserState {
  users: User[]
  loading: boolean
  error: string | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    users: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchUsers() {
      try {
        this.loading = true
        this.error = null

        this.users = await getUsers()
      } catch {
        this.error = 'Erro ao carregar usuários'
      } finally {
        this.loading = false
      }
    },
  },
})
