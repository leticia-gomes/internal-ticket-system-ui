export function formatStatus(status?: string) {
  if (!status) return ''

  const statuses: Record<string, string> = {
    OPEN: 'aberto',
    IN_PROGRESS: 'em andamento',
    RESOLVED: 'resolvido',
    CLOSED: 'fechado',
  }

  return statuses[status] ?? status.toLowerCase()
}


export function formatPriority(priority?: string) {
  if (!priority) return ''

  const priorities: Record<string, string> = {
    LOW: 'baixa',
    MEDIUM: 'média',
    HIGH: 'alta',
    URGENT: 'urgente',
  }

  return priorities[priority] ?? priority.toLowerCase()
}
