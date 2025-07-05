import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow border-b border-gray-200 dark:border-gray-700">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Brand */}
        <NavLink
          to="/books"
          className="text-2xl md:text-3xl font-extrabold tracking-tight hover:opacity-90 transition"
        >
          📚 LIBRARY
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-bold"
                : "text-gray-700 dark:text-gray-200 hover:text-blue-600 transition"
            }
          >
            ALL BOOKS
          </NavLink>
          <NavLink
            to="/create-book"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-bold"
                : "text-gray-700 dark:text-gray-200 hover:text-blue-600 transition"
            }
          >
            ADD BOOKS
          </NavLink>
          <NavLink
            to="/borrow-summary"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-bold"
                : "text-gray-700 dark:text-gray-200 hover:text-blue-600 transition"
            }
          >
            BORROW SUMMARY
          </NavLink>

          <button
            onClick={() => setIsDark(!isDark)}
            className="ml-4 px-3 py-1 border rounded border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {isDark ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl focus:outline-none"
          >
            {isOpen ? "✖️" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow border-t border-gray-200 dark:border-gray-700 flex flex-col items-center gap-4 py-4 transition">
          <NavLink
            to="/books"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-bold"
                : "text-gray-700 dark:text-gray-200 hover:text-blue-600 transition"
            }
          >
            ALL BOOKS
          </NavLink>
          <NavLink
            to="/create-book"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-bold"
                : "text-gray-700 dark:text-gray-200 hover:text-blue-600 transition"
            }
          >
            ADD BOOKS
          </NavLink>
          <NavLink
            to="/borrow-summary"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-bold"
                : "text-gray-700 dark:text-gray-200 hover:text-blue-600 transition"
            }
          >
            BORROW SUMMARY
          </NavLink>

          <button
            onClick={() => {
              setIsDark(!isDark);
              setIsOpen(false);
            }}
            className="px-3 py-1 border rounded border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {isDark ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      )}
    </header>
  );
}
