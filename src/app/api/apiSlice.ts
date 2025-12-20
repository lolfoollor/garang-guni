import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { API_ROUTES } from "./apiRoutes";
import { Mutex } from "async-mutex";
import { HttpStatusCode } from "axios";
import { logout, setCredentials } from "@/features/auth/authSlice";
import { RootState } from "../store";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: API_ROUTES.BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {},
) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  const state = api.getState() as RootState;
  const token = state.auth.token;

  if (result.error?.status !== HttpStatusCode.Unauthorized || !token) {
    return result;
  }

  if (mutex.isLocked()) {
    await mutex.waitForUnlock();
    return baseQuery(args, api, extraOptions);
  }

  const release = await mutex.acquire();

  try {
    const refreshResult = await baseQuery(
      { url: API_ROUTES.AUTH.REFRESH, method: 'POST' },
      api,
      extraOptions);
    
      if (refreshResult?.data) {
        api.dispatch(setCredentials(refreshResult.data as { accessToken: string }));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
  } finally {
    release();
  }

  return result;
};

export enum TagTypes {
  RateTag = "Rates",
  ItemTag = "Items",
  UserTag = "Users",
  BookingTag = "Bookings",
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    TagTypes.RateTag,
    TagTypes.ItemTag,
    TagTypes.UserTag,
    TagTypes.BookingTag,
  ],
  endpoints: () => ({}),
});
