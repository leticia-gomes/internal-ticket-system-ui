import type { TicketComment } from './ticket-comment.type'
import type { TicketUser } from './ticket-user.type'

export interface Ticket {
  id: number
  title: string
  description: string

  status: string
  priority: string

  createdBy: TicketUser

  assignedTo: TicketUser | null

  comments: TicketComment[]

  createdAt: string
  updatedAt: string
}
