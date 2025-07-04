import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBorrowBookMutation } from "../../features/borrow/borrowApi";
import { toast } from "react-toastify";

export default function BorrowCreate() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [borrowBook, { isLoading, error }] = useBorrowBookMutation();

  const [formData, setFormData] = useState({
    quantity: 1,
    dueDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (new Date(formData.dueDate) <= new Date()) {
      toast.error("❌ Due date must be in the future.");
      return;
    }

    if (!id) {
      toast.error("❌ Book ID is missing");
      return;
    }

    try {
      await borrowBook({
        book: id,
        quantity: formData.quantity,
        dueDate: formData.dueDate,
      }).unwrap();

      toast.success("✅ Borrow added successfully!");
      navigate("/borrow-summary");
    } catch (err: any) {
      toast.error("❌ Failed to add borrow!");
      console.error("❌ Error:", err);

      if (err.data) {
        alert(`Error: ${err.data.message || "Something went wrong!"}`);
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-2xl">
      <h1 className="text-2xl font-semibold mb-6">📚 Borrow Book</h1>

      {error && <p className="text-red-500">❌ Failed to borrow book</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min={1}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Due Date</label>
          <input
            type="datetime-local"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isLoading ? "Borrowing..." : "Borrow Book"}
        </button>
      </form>
    </div>
  );
}
