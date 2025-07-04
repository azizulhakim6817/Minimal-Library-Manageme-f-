import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetBooksQuery,
  useUpdateBookMutation,
} from "../../features/books/bookApi";
import { toast } from "react-toastify";

export default function EditBook() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // ✅ Get books only once
  const { data: booksResponse, isLoading, isError, error } = useGetBooksQuery();

  // ✅ Get actual array safely
  const books = booksResponse?.data ?? [];

  // ✅ Find the book
  const book = books.find((b) => b._id === id);

  const [updateBook, { isLoading: isUpdating, error: updateError }] =
    useUpdateBookMutation();

  // ✅ Initial state
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
  });

  // ✅ Populate form when `book` is ready
  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description || "",
        copies: book.copies,
      });
    }
  }, [book]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (book) {
        await updateBook({ id: book._id, ...formData }).unwrap();
        toast.success("✅ Book Update successfully!");
        navigate("/books");
      }
    } catch (err) {
      console.error("❌ Failed to update book:", err);
       toast.error("❌ Failed to update book!");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError || !book) {
    return <p>Error: {error ? "Failed to fetch book" : "Book not found"}</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-2xl mb-6">
      <h1 className="text-2xl font-semibold mb-6">✏️ Edit Book</h1>

      {updateError && <p className="text-red-500">❌ Failed to update book</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Genre */}
        <div>
          <label className="block text-sm font-medium">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* ISBN */}
        <div>
          <label className="block text-sm font-medium">ISBN</label>
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Copies */}
        <div>
          <label className="block text-sm font-medium">Copies</label>
          <input
            type="number"
            name="copies"
            value={formData.copies}
            onChange={handleChange}
            min={0}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isUpdating}
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isUpdating ? "Updating..." : "Update Book"}
        </button>
      </form>
    </div>
  );
}
