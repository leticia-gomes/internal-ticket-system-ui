import { api } from '@/shared/services/api'

import type { TicketFilters } from '../types/ticket-filters.type'
import type { Ticket } from '../types/ticket.type'
import type { UpdateTicketRequest } from '../types/update-ticket-request.type'
import type { CreateTicketRequest } from '../types/create-ticket-request.type'

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

  const { data } = await api.get<Ticket>(
    `/tickets/${id}`,
  )

  return data
}

export async function createTicket(
  payload: CreateTicketRequest
): Promise<Ticket> {

  const { data } = await api.post<Ticket>(
    '/tickets',
    payload,
  )

  return data
}

export async function updateTicket(
  id: number,
  data: UpdateTicketRequest,
): Promise<Ticket> {

  const { data: response } = await api.patch<Ticket>(
    `/tickets/${id}`,
    data,
  )

  return response
}

export async function assignUser(
  ticketId: number,
  assignedToId: number,
): Promise<Ticket> {

  const { data } = await api.patch<Ticket>(
    `/tickets/${ticketId}/assign`,
    {
      assignedToId,
    },
  )

  return data
}

export async function deleteTicket(
  id: number,
): Promise<void> {

  await api.delete(`/tickets/${id}`);

}

export async function addComment(
  ticketId: number,
  content: string,
): Promise<Ticket> {

  const { data } = await api.post<Ticket>(
    `/tickets/${ticketId}/comments`,
    {
      content,
    },
  )

  return data
}
