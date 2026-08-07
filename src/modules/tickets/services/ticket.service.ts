import {
  addComment as addCommentApi,
  assignUser as assignUserApi,
  getTicketById,
  getTickets,
  updateTicket as updateTicketApi,
  createTicket as createTicketApi
} from '../api/ticket.api';
import type { CreateTicketRequest } from '../types/create-ticket-request.type';

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

  async create(
    data: CreateTicketRequest,
  ): Promise<Ticket> {
    return createTicketApi(data);
  }

  async update(
    id: number,
    data: UpdateTicketRequest,
  ): Promise<Ticket> {
    return updateTicketApi(id, data);
  }

  async assignUser(
    ticketId: number,
    assignedToId: number,
  ): Promise<Ticket> {
    return assignUserApi(
      ticketId,
      assignedToId,
    );
  }

  async addComment(
    ticketId: number,
    content: string,
  ): Promise<Ticket> {
    return addCommentApi(
      ticketId,
      content,
    );
  }
}
