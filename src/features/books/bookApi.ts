import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://vercel.com/azizul-hakims-projects-55c9db77/minimal-library-manageme-f/",
  }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query<{ data: Book[] }, void>({
      query: () => "books",
      providesTags: ["Books"],
    }),

    addBook: builder.mutation<void, Partial<Book>>({
      query: (newBook) => ({
        url: "books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation<void, Partial<Book> & { id: string }>({
      query: ({ id, ...rest }) => ({
        url: `books/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
    getBookById: builder.query<Book, string>({
      query: (id) => `books/${id}`,
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetBookByIdQuery,
} = bookApi;
