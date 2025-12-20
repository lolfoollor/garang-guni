import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApiSlice } from "./services/authApiSlice";

export interface User {
  userId: string;
  username: string;
  email: string;
  roles: string[];
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state: AuthState,
      action: PayloadAction<{ accessToken?: string; user?: User | null }>,
    ) => {
      const { user, accessToken } = action.payload;
      if (accessToken) state.token = accessToken;
      if (user) state.user = user;
    },
    logout: (state: AuthState) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApiSlice.endpoints.login.matchFulfilled,
        (state, action: PayloadAction<{ accessToken: string }>) => {
          state.token = action.payload.accessToken;
        },
      )
      .addMatcher(
        authApiSlice.endpoints.register.matchFulfilled,
        (state, action: PayloadAction<{ accessToken: string }>) => {
          state.token = action.payload.accessToken;
        },
      )
      .addMatcher(
        authApiSlice.endpoints.getMe.matchFulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
        },
      )
      .addMatcher(authApiSlice.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUsername = (state: RootState) =>
  state.auth.user?.username;
export const selectIsAuthenticated = (state: RootState) => !!state.auth.token;

export default authSlice.reducer;
