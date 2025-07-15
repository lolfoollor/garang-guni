import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingSchema } from "./schema";
import { Image } from "@/components/Image";
import { RootState } from "@/app/store";
import { deleteImage } from "@/app/db";
import { createAppAsyncThunk } from "@/app/withTypes";

type BookingDraftState = Partial<BookingSchema>;

export const clearBookingDraft = createAppAsyncThunk(
  "bookingDraft/clearBookingDraft",
  async (_, thunkAPI) => {
    const images = selectBookingImages(thunkAPI.getState());
    if (images) {
      await Promise.all(
        images.map(async (image: Image) => {
          await deleteImage(image.id);
        }),
      );
    }
    thunkAPI.dispatch(resetBookingDraft());
  },
);

const initialState: BookingDraftState = {};

export const bookingDraftSlice = createSlice({
  name: "bookingDraft",
  initialState,
  reducers: {
    setDraft: (state, action: PayloadAction<BookingDraftState>) => {
      return { ...state, ...action.payload };
    },
    clearDraft: () => initialState,
    resetBookingDraft: () => initialState,
  },
});

export const selectBookingImages = (state: RootState) =>
  state.bookingDraft.images;
export const { setDraft, clearDraft, resetBookingDraft } =
  bookingDraftSlice.actions;
export default bookingDraftSlice.reducer;
