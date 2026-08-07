import { defineStore } from 'pinia';

import socket from '@/shared/socket/socket';

import { TicketService } from '../services/ticket.service';
import type { CreateTicketRequest } from '../types/create-ticket-request.type';
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
    listenSocket(): void {
      socket.off('ticket:created');
      socket.off('ticket:updated');
      socket.off('ticket:deleted');
      socket.off('comment:created');

      socket.on('ticket:created', (ticket: Ticket) => {
        const exists = this.tickets.some(
          item => item.id === ticket.id,
        );

        if (!exists) {
          this.tickets.unshift(ticket);
        }
      });

      socket.on('ticket:updated', (ticket: Ticket) => {
        const index = this.tickets.findIndex(
          item => item.id === ticket.id,
        );

        if (index !== -1) {
          this.tickets[index] = ticket;
        }

        if (this.selectedTicket?.id === ticket.id) {
          this.selectedTicket = ticket;
        }
      });

      // socket.on('ticket:deleted', (ticketId: number) => {
      //   this.tickets = this.tickets.filter(
      //     ticket => ticket.id !== ticketId,
      //   );

      //   if (this.selectedTicket?.id === ticketId) {
      //     this.selectedTicket = null;
      //   }
      // });

      socket.on('ticket:deleted', (data: { id: number }) => {

        this.tickets = this.tickets.filter(
          ticket => ticket.id !== data.id,
        );

        if (this.selectedTicket?.id === data.id) {
          this.selectedTicket = null;
        }

      });

      socket.on('comment:created', (ticket: Ticket) => {
        if (this.selectedTicket?.id === ticket.id) {
          this.selectedTicket = ticket;
        }
      });

      // socket.on('comment:created', (comment) => {

      //   if (
      //     this.selectedTicket?.id === comment.ticketId
      //   ) {

      //     this.selectedTicket?.comments.push(comment);

      //   }

      // });
    },

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
        this.selectedTicket =
          await ticketService.findById(id);
      } finally {
        this.loading = false;
      }
    },

    async createTicket(
      data: CreateTicketRequest,
    ): Promise<Ticket> {
      const ticket =
        await ticketService.create(data);

      this.tickets.push(ticket);

      return ticket;
    },

    async updateTicket(
      id: number,
      data: UpdateTicketRequest,
    ): Promise<void> {
      await ticketService.update(id, data);

      const updatedTicket =
        await ticketService.findById(id);

      this.selectedTicket = updatedTicket;

      const index = this.tickets.findIndex(
        ticket => ticket.id === id,
      );

      if (index !== -1) {
        this.tickets[index] = updatedTicket;
      }
    },

    async assignUser(
      ticketId: number,
      assignedToId: number,
    ): Promise<void> {
      const updatedTicket =
        await ticketService.assignUser(
          ticketId,
          assignedToId,
        );

      this.selectedTicket = updatedTicket;

      const index = this.tickets.findIndex(
        ticket => ticket.id === ticketId,
      );

      if (index !== -1) {
        this.tickets[index] = updatedTicket;
      }
    },

    async addComment(
      ticketId: number,
      content: string,
    ): Promise<void> {
      await ticketService.addComment(
        ticketId,
        content,
      );

      this.selectedTicket =
        await ticketService.findById(ticketId);
    },

    async deleteTicket(
      id: number,
    ): Promise<void> {

      await ticketService.delete(id);


      this.tickets =
        this.tickets.filter(
          ticket => ticket.id !== id,
        );


      if (
        this.selectedTicket?.id === id
      ) {
        this.selectedTicket = null;
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
