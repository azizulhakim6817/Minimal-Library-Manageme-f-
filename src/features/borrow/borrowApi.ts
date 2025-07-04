import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Borrow {
  _id: string;
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  tagTypes: ["Books", "Borrow"],
  endpoints: (builder) => ({
    borrowBook: builder.mutation<
      void,
      { book: string; quantity: number; dueDate: string }
    >({
      query: ({ book, quantity, dueDate }) => ({
        url: `borrow`,
        method: "POST",
        body: { book, quantity, dueDate },
        invalidatesTags: ["Borrow"],
      }),
    }),

    getBorrowSummary: builder.query<Borrow[], void>({
      query: () => "borrow",
      providesTags: ["Borrow"],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
