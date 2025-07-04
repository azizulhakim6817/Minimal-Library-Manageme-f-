import { useParams, Link } from "react-router-dom";
import { useGetBooksQuery } from "../../features/books/bookApi";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useGetBooksQuery();

  const book = data?.data?.find((b) => b._id === id);

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">
        ❌ {(error as any).message}
      </p>
    );
  if (!book)
    return <p className="text-center text-red-500 py-10">❌ Book not found</p>;

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <h1 className="text-xl font-semibold  mb-6 dark:text-blue-400">
        📖 Title: <span className=" text-blue-600">{book.title}</span>
      </h1>

      <div className="space-y-4 text-gray-800 dark:text-gray-200">
        <p>
          <span className="font-semibold">✍️ Author:</span>{" "}
          <span className="ml-1">{book.author}</span>
        </p>
        <p>
          <span className="font-semibold">📚 Genre:</span>{" "}
          <span className="ml-1">{book.genre}</span>
        </p>
        <p>
          <span className="font-semibold">🔢 ISBN:</span>{" "}
          <span className="ml-1">{book.isbn}</span>
        </p>
        <p>
          <span className="font-semibold">📝 Description:</span>
          <br />
          <span className="ml-1 block">{book.description}</span>
        </p>
        <p>
          <span className="font-semibold">📦 Copies:</span>{" "}
          <span className="ml-1">{book.copies}</span>
        </p>
        <p>
          <span className="font-semibold">✅ Available:</span>{" "}
          <span className="ml-1">{book.available ? "✔️ Yes" : "❌ No"}</span>
        </p>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <Link
          to={`/edit-book/${book._id}`}
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-md font-medium shadow transition duration-200"
        >
          ✏️ Edit Book
        </Link>

        <Link
          to="/books"
          className="inline-block bg-gray-200 hover:bg-gray-300 text-black px-6 py-2 rounded-md font-medium shadow transition duration-200"
        >
          ⬅️ Back to Books
        </Link>
      </div>
    </div>
  );
}
