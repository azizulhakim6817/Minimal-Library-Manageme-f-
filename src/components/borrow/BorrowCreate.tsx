import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBorrowBookMutation } from "../../features/borrow/borrowApi";
import { useGetBooksQuery } from "../../features/books/bookApi"; // <-- Import to trigger refetch
import { toast } from "react-toastify";

export default function BorrowCreate() {
  const { id } = useParams<{ id: string }>(); // 📌 Book ID from URL
  const navigate = useNavigate();
  const { refetch } = useGetBooksQuery(); // <-- Used for refetching book data after borrow
  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  // ✅ Form state
  const [formData, setFormData] = useState({
    quantity: 1,
    dueDate: "",
  });

  // ✅ Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  // ✅ Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.quantity < 1) {
      toast.error("❌ Quantity must be at least 1.");
      return;
    }

    if (new Date(formData.dueDate) <= new Date()) {
      toast.error("❌ Due date must be in the future.");
      return;
    }

    if (!id) {
      toast.error("❌ Book ID is missing.");
      return;
    }

    console.log("👉 Borrow Payload:", {
      book: id,
      quantity: formData.quantity,
      dueDate: new Date(formData.dueDate).toISOString(),
    });

    try {
      // Borrow the book
      await borrowBook({
        book: id,
        quantity: formData.quantity,
        dueDate: new Date(formData.dueDate).toISOString(),
      }).unwrap();

      // Re-fetch the book list to get updated data (copies, availability)
      refetch();

      toast.success("✅ Borrow added successfully!");
      navigate("/borrow-summary");
    } catch (err: any) {
      console.error("❌ Borrow Error:", err);
      toast.error(`❌ Failed: ${err?.data?.message || "Unknown error"}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md bg-white dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        📚 Borrow Book
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Quantity */}
        <div>
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            min={1}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:border-gray-600"
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="block mb-1 font-medium">Due Date</label>
          <input
            type="datetime-local"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:border-gray-600"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? "Borrowing..." : "Borrow Book"}
        </button>
      </form>
    </div>
  );
}
