import { API_ROUTES } from "@/app/api/apiRoutes";
import { apiSlice, TagTypes } from "@/app/api/apiSlice";

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
      query: () => API_ROUTES.RATES.GET_ALL,
      providesTags: (result = []) => [
        TagTypes.RateTag,
        ...result.map(
          ({ rateId }) => ({ type: TagTypes.RateTag, id: rateId } as const),
        ),
      ],
    }),
    getRate: builder.query<Rate, string>({
      query: (rateId) => API_ROUTES.RATES.BY_ID(rateId),
      providesTags: (_result, _error, arg) => [
        { type: TagTypes.RateTag, id: arg },
      ],
    }),
    addNewRate: builder.mutation<Rate, NewRate>({
      query: (initialRate) => ({
        url: API_ROUTES.RATES.POST,
        method: "POST",
        body: initialRate,
      }),
      invalidatesTags: [TagTypes.RateTag],
    }),
    editRate: builder.mutation<Rate, RateUpdate>({
      query: (updatedRate) => ({
        url: API_ROUTES.RATES.BY_ID(updatedRate.rateId),
        method: "PATCH",
        body: updatedRate,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: TagTypes.RateTag, id: arg.rateId },
      ],
    }),
    deleteRate: builder.mutation<void, string>({
      query: (rateId) => ({
        url: API_ROUTES.RATES.BY_ID(rateId),
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: TagTypes.RateTag, id: arg },
      ],
    }),
  }),
});

export const { 
  useGetRatesQuery, 
  useGetRateQuery,       
  useAddNewRateMutation, 
  useEditRateMutation,   
  useDeleteRateMutation,
} = rateApiSlice;
