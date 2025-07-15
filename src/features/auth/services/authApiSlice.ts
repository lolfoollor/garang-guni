import {
  LOGIN_API_URL,
  LOGOUT_API_URL,
  ME_API_URL,
  REGISTER_API_URL,
  RESET_PASSWORD_API_URL,
} from "@/app/api/apiRoutes";
import { apiSlice, TagTypes } from "@/app/api/apiSlice";
import { User } from "../authSlice";

interface AuthResponse {
  accessToken: string;
}

interface LoginUserInputs {
  email: string;
  password: string;
}

interface RegisterUserInputs {
  username: string;
  email: string;
  password: string;
}

interface ForgotPasswordInputs {
  email: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginUserInputs>({
      query: (credentials: LoginUserInputs) => ({
        url: LOGIN_API_URL,
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterUserInputs>({
      query: (user: RegisterUserInputs) => ({
        url: REGISTER_API_URL,
        method: "POST",
        body: user,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: LOGOUT_API_URL,
        method: "POST",
      }),
    }),
    getMe: builder.query<User, void>({
      query: () => ME_API_URL,
      providesTags: [TagTypes.UserTag],
    }),
    resetPassword: builder.mutation<void, ForgotPasswordInputs>({
      query: ({ email }: ForgotPasswordInputs) => ({
        url: RESET_PASSWORD_API_URL,
        method: "POST",
        body: { email },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useLazyGetMeQuery,
  useResetPasswordMutation,
} = authApiSlice;
