import type { AuthenticatedUser } from './authenticated-user'

export interface LoginResponse {
  accessToken: string
  user: AuthenticatedUser
}
