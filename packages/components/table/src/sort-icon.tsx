import React from "react";

interface SortIconProps {
  direction: "asc" | "desc" | null;
}

export function SortIcon({ direction }: SortIconProps) {
  if (!direction) {
    return (
      <div className="flex flex-col justify-center items-center h-4 w-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-neutral-400 dark:text-neutral-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-4 w-4">
      {direction === "asc" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-neutral-700 dark:text-neutral-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 15l7-7 7 7"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-neutral-700 dark:text-neutral-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      )}
    </div>
  );
}
