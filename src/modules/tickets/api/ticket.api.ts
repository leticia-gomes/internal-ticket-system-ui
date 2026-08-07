import { api } from '@/shared/services/api'

import type { TicketFilters } from '../types/ticket-filters.type'
import type { Ticket } from '../types/ticket.type'
import type { UpdateTicketRequest } from '../types/update-ticket-request.type'

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

export async function updateTicket(
  id: number,
  data: UpdateTicketRequest,
): Promise<Ticket> {

  const { data: response } = await api.patch<Ticket>(
    `/tickets/${id}`,
    data,
  );

  return response;
}
