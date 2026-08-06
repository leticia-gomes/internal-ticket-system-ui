import type { UserRole } from './user-role.type'

export interface AuthenticatedUser {
  id: number
  name: string
  email: string
  role: UserRole
}
