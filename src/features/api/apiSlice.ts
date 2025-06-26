import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "./apiRoutes";

export enum TagTypes {
  RateTag = "Rates",
  ItemTag = "Items",
  UserTag = "Users",
  BookingTag = "Bookings",
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  tagTypes: [
    TagTypes.RateTag,
    TagTypes.ItemTag,
    TagTypes.UserTag,
    TagTypes.BookingTag,
  ],
  endpoints: () => ({}),
});
