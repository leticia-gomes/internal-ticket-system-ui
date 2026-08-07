import type { TicketUser } from './ticket-user.type'

export interface Ticket {
  id: number
  title: string
  description: string

  status: string
  priority: string

  createdBy: TicketUser

  assignedTo: TicketUser | null

  createdAt: string
  updatedAt: string
}
