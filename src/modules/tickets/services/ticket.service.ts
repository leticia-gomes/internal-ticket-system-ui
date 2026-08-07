import { getTickets } from '../api/ticket.api'

export class TicketService {
  async findAll(params?: Record<string, unknown>) {
    return getTickets(params)
  }
}
