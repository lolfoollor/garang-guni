import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import bookingDraftReducer, {
  setDraft,
} from "@/features/bookings/bookingDraftSlice";
import { persistReducer, persistStore } from "redux-persist";
import { loadImageBlob } from "./db";
import { Image } from "@/components/Image";
import { apiSlice } from "@/features/api/apiSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [],
};

const rootReducer = combineReducers({
  bookingDraft: bookingDraftReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

const refreshImageBlobs = async () => {
  const images = store.getState().bookingDraft.images;
  if (!images || images.length <= 0) {
    return;
  }

  const updatedImgs = await Promise.all(
    images.map(async (image: Image) => {
      const updatedImgBlob = await loadImageBlob(image.id);
      return { id: image.id, src: updatedImgBlob };
    }),
  );

  store.dispatch(setDraft({ images: updatedImgs }));
};

export const persistor = persistStore(store);
persistor.subscribe(async () => {
  const { bootstrapped } = persistor.getState();
  if (bootstrapped) {
    await refreshImageBlobs();
  }
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
