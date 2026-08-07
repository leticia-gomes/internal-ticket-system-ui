export interface CreateTicketRequest {
  title: string
  description: string
  priority: string
  assignedToId?: number | null
}
