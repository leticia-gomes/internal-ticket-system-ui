import { defineStore } from 'pinia';

import { TicketService } from '../services/ticket.service';
import type { TicketFilters } from '../types/ticket-filters.type';
import type { Ticket } from '../types/ticket.type';
import type { UpdateTicketRequest } from '../types/update-ticket-request.type';

interface TicketState {
  tickets: Ticket[];
  selectedTicket: Ticket | null;
  filters: TicketFilters;
  loading: boolean;
}

const ticketService = new TicketService();

export const useTicketStore = defineStore('ticket', {
  state: (): TicketState => ({
    tickets: [],
    selectedTicket: null,
    filters: {},
    loading: false,
  }),

  actions: {
    async loadTickets(): Promise<void> {
      this.loading = true;

      try {

        const filters = {
          ...this.filters,
          status: this.filters.status || undefined,
          priority: this.filters.priority || undefined,
        };

        this.tickets =
          await ticketService.findAll(filters);

      } finally {
        this.loading = false;
      }
    },

    async loadTicket(id: number): Promise<void> {
      this.loading = true;

      try {
        this.selectedTicket = await ticketService.findById(id);
      } finally {
        this.loading = false;
      }
    },

    async updateTicket(
      id: number,
      data: UpdateTicketRequest,
    ): Promise<void> {

      const updatedTicket =
        await ticketService.update(id, data);


      this.selectedTicket = updatedTicket;


      const index = this.tickets.findIndex(
        ticket => ticket.id === id,
      );


      if (index !== -1) {
        this.tickets[index] = updatedTicket;
      }

    },

    setFilters(filters: TicketFilters): void {
      this.filters = {
        ...this.filters,
        ...filters,
      };
    },

    clearFilters(): void {
      this.filters = {};
    },
  },
});
