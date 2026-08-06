const TOKEN_KEY = 'access_token';

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
  }
};
