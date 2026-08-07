export function formatRole(role?: string) {
  if (!role) return ''

  const roles: Record<string, string> = {
    ADMIN: 'admin',
    AGENT: 'agente',
    REQUESTER: 'requester',
  }

  return roles[role] ?? role.toLowerCase()
}
