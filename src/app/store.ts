import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "../features/books/bookApi";
import { borrowApi } from "../features/borrow/borrowApi";

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    [borrowApi.reducerPath]: borrowApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware, borrowApi.middleware),
});
