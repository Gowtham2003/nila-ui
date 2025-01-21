interface SortIconProps {
  direction: "asc" | "desc" | null;
}

export function SortIcon({ direction }: SortIconProps) {
  if (!direction) {
    return (
      <svg
        className="w-4 h-4 text-neutral-400 dark:text-neutral-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
        />
      </svg>
    );
  }

  if (direction === "asc") {
    return (
      <svg
        className="w-4 h-4 text-neutral-700 dark:text-neutral-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    );
  }

  return (
    <svg
      className="w-4 h-4 text-neutral-700 dark:text-neutral-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}
