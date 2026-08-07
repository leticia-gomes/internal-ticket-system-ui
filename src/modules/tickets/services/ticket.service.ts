import {
  getTicketById,
  getTickets,
  updateTicket as updateTicketApi,
} from '../api/ticket.api';

import type { TicketFilters } from '../types/ticket-filters.type';
import type { Ticket } from '../types/ticket.type';
import type { UpdateTicketRequest } from '../types/update-ticket-request.type';

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

  async update(
    id: number,
    data: UpdateTicketRequest,
  ): Promise<Ticket> {

    return updateTicketApi(id, data);

  }
}
