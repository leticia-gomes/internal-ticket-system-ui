import type { AuthenticatedUser } from './authenticated-user.type'

export interface LoginResponse {
  accessToken: string
  user: AuthenticatedUser
}
