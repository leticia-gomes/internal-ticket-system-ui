import { api } from '@/shared/services/api'

import type { LoginRequest } from '../types/login-request.type'
import type { LoginResponse } from '../types/login-response.type'

export class AuthApi {
  async login(
    data: LoginRequest
  ): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(
      '/auth/login',
      data
    )

    return response.data
  }
}
