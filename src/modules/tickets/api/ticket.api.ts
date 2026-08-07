import { api } from '@/shared/services/api'

export async function getTickets(params?: Record<string, unknown>) {
  const { data } = await api.get('/tickets', {
    params,
  })

  return data
}
