import type { TicketUser } from './ticket-user.type'

export interface TicketComment {
  id: number
  content: string
  createdBy: TicketUser
  createdAt: string
}
