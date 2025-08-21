// src/components/FilterBar.jsx
import { useState } from "react";
import clsx from "clsx";

export default function FilterBar({ categories, active, setActive }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {["All", ...categories].map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={clsx(
            "px-4 py-2 rounded-xl border transition",
            active === cat
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-transparent text-gray-700 dark:text-gray-200 border-gray-400 hover:bg-indigo-50 dark:hover:bg-gray-800"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
