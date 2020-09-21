import api from "@/plugins/api";
import decode from "jwt-decode";
import orderService from "./order";

const AUTH_TOKEN_KEY = "token";
const AUTH_USER_KEY = "user";

export default {
  async login(email, password) {
    try {
      const res = await api.post(`auth/login`, { email, password });
      if (res && !res.data.message) {
        this.persistUser(res.data.token, res.data.user);
        return res.data;
      }
      return false;
    } catch (err) {
      return false;
    }
  },
  async register(registerObj) {
    try {
      return await api.post(`auth/register`, registerObj);
    } catch (err) {
      return false
    }
  },
  logoutUser() {
    api.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem(AUTH_TOKEN_KEY);
    orderService.clearCart();
  },

  persistUser(token, user) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  },

  isLoggedIn() {
    const token = this.getAuthToken();
    const loggedIn = !!token && !this.isTokenExpired(token);
    if (loggedIn) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return loggedIn;
  },

  getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  isTokenExpired(token) {
    let expirationDate = this.getTokenExpirationDate(token);
    return expirationDate < new Date();
  },

  getTokenExpirationDate(encodedToken) {
    let token = decode(encodedToken);
    if (!token.exp) {
      return null;
    }

    let date = new Date(0);
    date.setUTCSeconds(token.exp);

    return date;
  },

  getUserInfo: function() {
    if (this.isLoggedIn()) {
      return decode(this.getAuthToken());
    }
  }
};
