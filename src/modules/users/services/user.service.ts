import { api } from '@/shared/services/api'
import type { User } from '../types/user.type'

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>('/users')

  return data
}
