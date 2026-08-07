export interface UpdateTicketRequest {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  assignedToId?: number | null;
}
