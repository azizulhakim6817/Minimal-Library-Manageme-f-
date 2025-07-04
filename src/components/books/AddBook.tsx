import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddBookMutation } from "../../features/books/bookApi";
import { toast } from "react-toastify";

export default function AddBook() {
  const navigate = useNavigate();
  const [addBook, { isLoading, error }] = useAddBookMutation();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
      await addBook({ ...formData, available: formData.copies > 0 }).unwrap();
      toast.success("✅ Book added successfully!");
      navigate("/books");
    } catch (err) {
      console.error("❌ Failed to add book:", err);
      toast.error("❌ Failed to add book!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-5 border rounded-2xl shadow-2xl mb-4">
      <h1 className="text-xl font-semibold mb-4 text-center  dark:text-gray-800">
        Add New Book
      </h1>

      {error && (
        <p className="text-center text-red-500 mb-3">❌ Failed to add book.</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <select
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded bg-white"
        >
          <option value="">Select Genre</option>
          <option value="FICTION">FICTION</option>
          <option value="NON_FICTION">NON_FICTION</option>
          <option value="SCIENCE">SCIENCE</option>
          <option value="HISTORY">HISTORY</option>
          <option value="BIOGRAPHY">BIOGRAPHY</option>
          <option value="FANTASY">FANTASY</option>
        </select>

        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={formData.isbn}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="number"
          name="copies"
          placeholder="Copies"
          min={0}
          value={formData.copies}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded  dark:text-gray-600"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLoading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}
