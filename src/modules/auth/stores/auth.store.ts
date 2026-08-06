import { defineStore } from 'pinia';

import { authStorage } from '@/shared/storage/auth.storage';
import { AuthService } from '../services/auth.service';

import type { LoginRequest } from '../types/login-request.type';
import type { AuthenticatedUser } from '../types/authenticated-user.type';


interface AuthState {
  user: AuthenticatedUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

const authService = new AuthService()

export const useAuthStore = defineStore('auth', {

  state: (): AuthState => ({
    user: null,
    token: authStorage.getToken(),
    isAuthenticated: authStorage.hasToken()
  }),


  actions: {

    async login(credentials: LoginRequest) {

      const response = await authService.login(credentials);


      this.token = response.accessToken;

      this.user = response.user;

      this.isAuthenticated = true;


      authStorage.saveToken(response.accessToken);
    },


    logout() {

      this.user = null;

      this.token = null;

      this.isAuthenticated = false;


      authStorage.removeToken();
    }

  }

});
