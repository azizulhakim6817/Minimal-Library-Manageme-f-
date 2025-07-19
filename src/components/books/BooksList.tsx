import { useState } from "react";
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
  const [showModal, setShowModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);

  const bookList = Array.isArray(books?.data) ? books.data : [];

  // Open confirmation modal
  const handleDeleteClick = (bookId: string) => {
    setBookToDelete(bookId);
    setShowModal(true);
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (bookToDelete) {
      deleteBook(bookToDelete);
      setShowModal(false); // Close the modal
    }
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-center text-xl md:text-2xl font-bold mb-6">
        📚 Books List
      </h1>

      {isLoading && (
        <p className="text-center text-gray-600 dark:text-gray-300">
          Loading...
        </p>
      )}

      {isError && (
        <p className="text-center text-red-500">
          Error: {(error as any).message}
        </p>
      )}

      {bookList.length > 0 ? (
        <div className="w-full overflow-x-auto rounded-lg shadow">
          <table className="w-full min-w-[600px] border border-collapse rounded-xl text-sm md:text-base">
            <thead className="bg-gray-200 dark:bg-gray-800 dark:text-gray-100">
              <tr>
                <th className="p-3 border text-left">#</th>
                <th className="p-3 border text-left">Title</th>
                <th className="p-3 border text-left">Author</th>
                <th className="p-3 border text-left">Copies</th>
                <th className="p-3 border text-left">Available</th>
                <th className="p-3 border text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookList.map((book, i) => (
                <tr
                  key={book._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-3 border">{i + 1}</td>
                  <td className="p-3 border break-words max-w-[200px] truncate">
                    {book?.title}
                  </td>
                  <td className="p-3 border break-words max-w-[200px] truncate">
                    {book.author}
                  </td>
                  <td className="p-3 border">{book.copies}</td>
                  <td className="p-3 border">
                    {book.available ? "✅ Yes" : "❌ No"}
                  </td>
                  <td className="p-3 border">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/edit-book/${book._id}`}
                        className="inline-flex items-center gap-1 bg-yellow-400 text-black px-2 py-1 rounded hover:bg-yellow-500 transition"
                      >
                        <FaEdit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(book._id)}
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
                        className="inline-flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                      >
                        <FaBookOpen className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading && (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No books found.
          </p>
        )
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
            <h3 className="text-center text-xl font-semibold">Delete Book</h3>
            <p className="text-center my-4">
              Are you sure you want to delete this book?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
