import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApiSlice } from "./services/authApiSlice";
import msg from "@/locales/en/auth/auth.json";

export interface User {
  userId: string;
  username: string;
  email: string;
  roles: string[];
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  status: "idle" | "pending" | "succeeded" | "rejected";
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  token: null,
  error: null,
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
      if (accessToken !== undefined) {
        state.token = accessToken;
      }
      if (user !== undefined) {
        state.user = user;
      }
      state.status = "succeeded";
      state.error = null;
    },
    logout: (state: AuthState) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state: AuthState) => {
      state.status = "pending";
      state.error = null;
    };

    const handleRejected = (state: AuthState, action: any) => {
      state.status = "rejected";
      state.error =
        action.payload?.data?.message ||
        action.error?.message ||
        msg.authSlice.error.default;
      state.token = null;
      state.user = null;
    };

    builder
      .addMatcher(authApiSlice.endpoints.login.matchPending, handlePending)
      .addMatcher(
        authApiSlice.endpoints.login.matchFulfilled,
        (state, action: PayloadAction<{ accessToken: string }>) => {
          state.token = action.payload.accessToken;
          state.status = "succeeded";
          state.error = null;
          localStorage.setItem("accessToken", action.payload.accessToken);
        },
      )
      .addMatcher(authApiSlice.endpoints.login.matchRejected, handleRejected)
      .addMatcher(authApiSlice.endpoints.register.matchPending, handlePending)
      .addMatcher(
        authApiSlice.endpoints.register.matchFulfilled,
        (state, action: PayloadAction<{ accessToken: string }>) => {
          state.token = action.payload.accessToken;
          state.status = "succeeded";
          state.error = null;
          localStorage.setItem("accessToken", action.payload.accessToken);
        },
      )
      .addMatcher(authApiSlice.endpoints.register.matchRejected, handleRejected)
      .addMatcher(authApiSlice.endpoints.getMe.matchPending, handlePending)
      .addMatcher(
        authApiSlice.endpoints.getMe.matchFulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
          state.status = "succeeded";
          state.error = null;
        },
      )
      .addMatcher(
        authApiSlice.endpoints.getMe.matchRejected,
        (state, action: any) => {
          handleRejected(state, action);
          state.user = null;
        },
      )
      .addMatcher(authApiSlice.endpoints.logout.matchPending, handlePending)
      .addMatcher(authApiSlice.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = "idle";
        state.error = null;
        localStorage.removeItem("accessToken");
      })
      .addMatcher(authApiSlice.endpoints.logout.matchRejected, handleRejected);
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;

export const selectCurrentUsername = (state: RootState) =>
  state.auth.user?.username;
export default authSlice.reducer;
