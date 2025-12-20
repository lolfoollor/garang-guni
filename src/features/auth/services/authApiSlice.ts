import { API_ROUTES } from "@/app/api/apiRoutes";
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
        url: API_ROUTES.AUTH.LOGIN,
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterUserInputs>({
      query: (user: RegisterUserInputs) => ({
        url: API_ROUTES.AUTH.REGISTER,
        method: "POST",
        body: user,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: API_ROUTES.AUTH.LOGOUT,
        method: "POST",
      }),
    }),
    getMe: builder.query<User, void>({
      query: () => API_ROUTES.USER.ME,
      providesTags: [TagTypes.UserTag],
    }),
    resetPassword: builder.mutation<void, ForgotPasswordInputs>({
      query: ({ email }: ForgotPasswordInputs) => ({
        url: API_ROUTES.AUTH.RESET_PASSWORD,
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
