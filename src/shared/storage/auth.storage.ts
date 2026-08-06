import type { AuthenticatedUser } from '@/modules/auth/types/authenticated-user.type';

const TOKEN_KEY = 'access_token';
const USER_KEY = 'authenticated_user';

export const authStorage = {
  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  hasToken() {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  },

  saveUser(user: AuthenticatedUser) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser(): AuthenticatedUser | null {
    const user = localStorage.getItem(USER_KEY);

    if (!user) {
      return null;
    }

    return JSON.parse(user) as AuthenticatedUser;
  },

  removeUser() {
    localStorage.removeItem(USER_KEY);
  },

  clear() {
    this.removeToken();
    this.removeUser();
  }
};
