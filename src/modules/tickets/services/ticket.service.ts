import {
  getTicketById,
  getTickets,
} from '../api/ticket.api';

import type { TicketFilters } from '../types/ticket-filters.type';
import type { Ticket } from '../types/ticket.type';

export class TicketService {
  async findAll(
    filters?: TicketFilters,
  ): Promise<Ticket[]> {
    return getTickets(filters);
  }

  async findById(
    id: number,
  ): Promise<Ticket> {
    return getTicketById(id);
  }
}
