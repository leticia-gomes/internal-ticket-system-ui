import type { UserRole } from './user-role'

export interface AuthenticatedUser {
  id: number
  name: string
  email: string
  role: UserRole
}
