import { AuthApi } from '../api/auth.api'

import type { LoginRequest } from '../types/login-request'
import type { LoginResponse } from '../types/login-response'

export class AuthService {
  private readonly authApi: AuthApi

  constructor() {
    this.authApi = new AuthApi()
  }

  async login(
    data: LoginRequest
  ): Promise<LoginResponse> {
    return this.authApi.login(data)
  }
}
