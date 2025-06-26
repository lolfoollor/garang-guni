import { RATE_API_URL } from "@/features/api/apiRoutes";
import { apiSlice, TagTypes } from "@/features/api/apiSlice";

export type Rate = {
  rateId: string;
  name: string;
  category: string;
  pickupRate: number;
  dropoffRate: number;
  unit: string;
  createdAt: string;
  updatedAt: string;
};

export type RateUpdate = {
  rateId: string;
} & Partial<
  Pick<Rate, "name" | "category" | "pickupRate" | "dropoffRate" | "unit">
>;
export type NewRate = Pick<
  Rate,
  "name" | "category" | "pickupRate" | "dropoffRate" | "unit"
>;

export const rateApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRates: builder.query<Rate[], void>({
      query: () => RATE_API_URL,
      providesTags: (result = []) => [
        TagTypes.RateTag,
        ...result.map(
          ({ rateId }) => ({ type: TagTypes.RateTag, rateId } as const),
        ),
      ],
    }),
    getRate: builder.query<Rate[], string>({
      query: (rateId) => `${RATE_API_URL}/${rateId}`,
      providesTags: (_result, _error, arg) => [
        { type: TagTypes.RateTag, id: arg },
      ],
    }),
    addNewRate: builder.mutation<Rate, NewRate>({
      query: (initialRate) => ({
        url: RATE_API_URL,
        method: "POST",
        body: initialRate,
      }),
      invalidatesTags: [TagTypes.RateTag],
    }),
    editRate: builder.mutation<Rate, RateUpdate>({
      query: (updatedRate) => ({
        url: `${RATE_API_URL}/${updatedRate.rateId}`,
        method: "PATCH",
        body: updatedRate,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: TagTypes.RateTag, id: arg.rateId },
      ],
    }),
    deleteRate: builder.mutation<void, string>({
      query: (rateId) => ({
        url: `${RATE_API_URL}/${rateId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: TagTypes.RateTag, id: arg },
      ],
    }),
  }),
});

export const { useGetRatesQuery } = rateApiSlice;
