import { defineStore } from 'pinia';

import { authStorage } from '@/shared/storage/auth.storage';
import { AuthService } from '../services/auth.service';

import type { LoginRequest } from '../types/login-request.type';
import type { AuthenticatedUser } from '../types/authenticated-user.type';

// ate aqui ...
interface AuthState {
  user: AuthenticatedUser | null;
  token: string | null;
}

const authService = new AuthService()

export const useAuthStore = defineStore('auth', {

  state: (): AuthState => ({
    user: authStorage.getUser(),
    token: authStorage.getToken()
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.token && state.user)
  },

  actions: {

    async login(credentials: LoginRequest) {

      const response = await authService.login(credentials);

      this.token = response.accessToken;
      this.user = response.user;

      authStorage.saveToken(response.accessToken);
      authStorage.saveUser(response.user);
    },

    logout() {

      this.user = null;
      this.token = null;

      authStorage.clear();
    }
  }

});
