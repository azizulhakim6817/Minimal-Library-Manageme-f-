import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <nav className="px-6 py-4 shadow-lg flex items-center justify-between border-b border-gray-200 dark:border-gray-600">
      <NavLink
        to="/books"
        className={({ isActive }) =>
          isActive
            ? "font-bold text-3xl"
            : "hover:underline hover:font-medium font-semibold text-3xl"
        }
      >
        📚 LIBRARY
      </NavLink>

      <div className="space-x-4">
        <NavLink
          to="/books"
          className={({ isActive }) =>
            isActive
              ? "font-bold text-blue-600"
              : "hover:underline hover:font-medium font-semibold"
          }
        >
          ALL BOOKS
        </NavLink>
        <NavLink
          to="/create-book"
          className={({ isActive }) =>
            isActive
              ? "font-bold text-blue-600"
              : "hover:underline hover:font-medium font-semibold"
          }
        >
          ADD BOOKS
        </NavLink>
        <NavLink
          to="/borrow-summary"
          className={({ isActive }) =>
            isActive
              ? "font-bold text-blue-600"
              : "hover:underline hover:font-medium font-semibold"
          }
        >
          BORROW SUMMARY
        </NavLink>
      </div>

      <button
        onClick={() => setIsDark(!isDark)}
        className="ml-4 px-3 py-1 rounded border border-gray-300 dark:border-gray-500"
      >
        {isDark ? "🌙 Dark" : "☀️ Light"}
      </button>
    </nav>
  );
}
