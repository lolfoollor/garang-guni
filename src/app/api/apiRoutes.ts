// export const BASE_API_URL = "https://6698c57b2069c438cd6feb5e.mockapi.io";
const BASE_URL = "http://localhost:5000/api"
const AUTH_PREFIX = "/auth";
const RATE_PREFIX = '/items';
const USER_PREFIX = '/users'

export const API_ROUTES = {
  BASE_URL: `${BASE_URL}`,
  AUTH: {
    LOGIN: `${AUTH_PREFIX}/login`,
    REGISTER: `${AUTH_PREFIX}/register`,
    REFRESH: `${AUTH_PREFIX}/refresh`,
    LOGOUT: `${AUTH_PREFIX}/logout`,
    RESET_PASSWORD: `${AUTH_PREFIX}/reset-password`,
  },
  USER: {
    ME: `${USER_PREFIX}/me`,
  },
  RATES: {
    POST: `${RATE_PREFIX}`,
    GET_ALL: `${RATE_PREFIX}`,
    BY_ID: (id: string | number) => `${RATE_PREFIX}/${id}`,
  },
} as const;