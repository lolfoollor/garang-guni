import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { BASE_API_URL, REFRESH_API_URL } from "./apiRoutes";
import { HttpStatusCode } from "axios";
import { logout, setCredentials } from "@/features/auth/authSlice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
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
  let result = await baseQuery(args, api, extraOptions);
  const state = api.getState() as RootState;
  const resultErrorStatusCode =
    result?.error &&
    typeof result.error.status === "number" &&
    result.error.status;

  if (
    !state.auth.token ||
    resultErrorStatusCode !== HttpStatusCode.Unauthorized
  ) {
    return result;
  }

  const refreshResult = await baseQuery(REFRESH_API_URL, api, extraOptions);
  if (refreshResult?.data) {
    api.dispatch(setCredentials({ ...refreshResult.data }));
    result = await baseQuery(args, api, extraOptions);
  } else {
    api.dispatch(logout());
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
