export interface TicketUser {
  id: number
  name: string
}

export interface Ticket {
  id: number
  title: string
  status: string
  priority: string

  assignedTo: TicketUser | null

  updatedAt: string
}
