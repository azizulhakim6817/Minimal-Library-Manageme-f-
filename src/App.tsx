import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Loyout/Navbar";
import BooksListPage from "./pages/BooksListPage";
import AddBookPage from "./pages/AddBookPage";
import EditBookPage from "./pages/EditBookPage";
import BorrowCreatePage from "./pages/BorrowCreatePage";
import BorrowSummaryPage from "./pages/BorrowSummaryPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import Footer from "./components/Loyout/Footer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/books" element={<BooksListPage />} />
          <Route path="/create-book" element={<AddBookPage />} />
          <Route path="/edit-book/:id" element={<EditBookPage />} />
          <Route path="/borrow/:id" element={<BorrowCreatePage />} />
          <Route path="/borrow-summary" element={<BorrowSummaryPage />} />
          <Route path="/books/:id" element={<BookDetailsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
