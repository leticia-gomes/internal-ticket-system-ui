import { api } from '@/shared/services/api'

import type { TicketFilters } from '../types/ticket-filters.type'
import type { Ticket } from '../types/ticket.type'

export async function getTickets(
  filters?: TicketFilters,
): Promise<Ticket[]> {
  const { data } = await api.get<Ticket[]>('/tickets', {
    params: filters,
  })

  return data
}

export async function getTicketById(
  id: number,
): Promise<Ticket> {
  const { data } = await api.get<Ticket>(`/tickets/${id}`)

  return data
}
