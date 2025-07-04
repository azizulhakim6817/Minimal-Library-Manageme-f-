import { Link } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "../../features/books/bookApi";
import { FaEdit, FaEye, FaBookOpen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function BooksList() {
  const { data: books, isLoading, isError, error } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  const bookList = Array.isArray(books?.data) ? books.data : [];

  return (
    <div className="p-4 md:p-8 overflow-x-auto">
      <h1 className="text-center text-xl md:text-2xl font-bold mb-4">
        BOOKS LIST
      </h1>

      {isLoading && <p>Loading...</p>}
      {isError && (
        <p className="text-red-500">Error: {(error as any).message}</p>
      )}

      {bookList.length > 0 ? (
        <table className="w-full border border-collapse rounded-xl shadow-xl  text-sm md:text-base">
          <thead className="bg-gray-200 dark:text-gray-900">
            <tr>
              <th className="p-2 border text-left">#</th>
              <th className="p-2 border text-left">Title</th>
              <th className="p-2 border text-left">Author</th>
              <th className="p-2 border text-left">Copies</th>
              <th className="p-2 border text-left">Available</th>
              <th className="p-2 border text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookList.map((book, i) => (
              <tr key={book._id} className="hover:bg-gray-50">
                <td className="p-2 border">{i + 1}</td>

                <td className="p-2 border break-words max-w-xs">
                  {book?.title}
                </td>

                <td className="p-2 border break-words max-w-xs">
                  {book.author}
                </td>

                <td className="p-2 border">{book.copies}</td>

                <td className="p-2 border">
                  {book.available ? "✅ Yes" : "❌ No"}
                </td>

                <td className="p-2 border space-y-2 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
                  <Link
                    to={`/edit-book/${book._id}`}
                    className="text-center inline-flex items-center gap-1 bg-yellow-400 text-black px-2 py-1 rounded hover:bg-yellow-500 transition"
                  >
                    <FaEdit className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => deleteBook(book._id)}
                    className="inline-flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  >
                    <MdDelete className="w-4 h-4" />
                  </button>
                  <Link
                    to={`/books/${book._id}`}
                    className="inline-flex items-center gap-1 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                  >
                    <FaEye className="w-4 h-4" />
                  </Link>
                  <Link
                    to={`/borrow/${book._id}`}
                    className=" inline-flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                  >
                    <FaBookOpen className="  w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !isLoading && <p>No books found.</p>
      )}
    </div>
  );
}
