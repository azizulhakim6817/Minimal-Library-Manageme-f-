import { useGetBorrowSummaryQuery } from "../../features/borrow/borrowApi";

export default function BorrowSummary() {
  const { data, isLoading, isError, error } = useGetBorrowSummaryQuery();

//borrows -----------
  const borrows = data;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow-2xl">
      <h1 className="text-2xl font-bold mb-6">📋 Borrow Summary</h1>

      {isLoading && <p>Loading borrow summary...</p>}

      {isError && (
        <p className="text-red-500">
          Error: {(error as any).message || "Failed to load borrow summary"}
        </p>
      )}

      {borrows && borrows.length > 0 ? (
        <table className="w-full border border-collapse">
          <thead className="bg-gray-200  dark:text-gray-900">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">ISBN</th>
              <th className="p-2 border">Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            {borrows.map((borrow, i) => (
              <tr key={borrow._id}>
                <td className="p-2 border">{i + 1}</td>
                <td className="p-2 border">
                  {borrow?.book?.title?.length > 20
                    ? `${borrow.book.title.slice(0, 20)}...`
                    : borrow?.book?.title}
                </td>
                <td className="p-2 border">{borrow?.book?.isbn}</td>
                <td className="p-2 border">{borrow?.totalQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !isLoading && <p>No borrow records found.</p>
      )}
    </div>
  );
}
