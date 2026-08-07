import { defineStore } from 'pinia'

import { TicketService } from '../services/ticket.service'
import type { Ticket } from '../types/ticket.type'

const service = new TicketService()

export const useTicketStore = defineStore('ticket', {
  state: () => ({
    tickets: [] as Ticket[],
    loading: false,
  }),

  actions: {
    async loadTickets(params?: Record<string, unknown>) {
      this.loading = true

      try {
        this.tickets = await service.findAll(params)
      } finally {
        this.loading = false
      }
    },
  },
})
