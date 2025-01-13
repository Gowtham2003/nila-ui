import React from "react";

interface TableSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TableSearch({
  value,
  onChange,
  placeholder = "Search...",
}: TableSearchProps) {
  return (
    <div className="relative max-w-xs">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-neutral-400 dark:text-neutral-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          name="search"
          id="search"
          className="block w-full pl-10 pr-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md leading-5 bg-white dark:bg-neutral-800 placeholder-neutral-500 dark:placeholder-neutral-400 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:placeholder-neutral-400 dark:focus:placeholder-neutral-500 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
