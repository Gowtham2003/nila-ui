import { cn } from "./lib/utils";

interface TablePaginatorProps {
  currentPage: number;
  totalRows: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
  onPageChange: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  showRowsPerPage?: boolean;
  showCurrentPageReport?: boolean;
}

export function TablePaginator({
  currentPage,
  totalRows,
  rowsPerPage,
  rowsPerPageOptions,
  onPageChange,
  onRowsPerPageChange,
  showRowsPerPage = true,
  showCurrentPageReport = true,
}: TablePaginatorProps) {
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(startRow + rowsPerPage - 1, totalRows);

  const buttonClasses = cn(
    "relative inline-flex items-center justify-center h-9 min-w-[2.25rem] px-3 text-sm font-medium transition-all duration-200",
    "border border-transparent",
    "focus:outline-none",
    "disabled:opacity-50 disabled:cursor-not-allowed"
  );

  const activeButtonClasses = cn(
    buttonClasses,
    "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    "border-blue-200 dark:border-blue-800",
    "shadow-sm shadow-blue-100 dark:shadow-blue-900/20",
    "hover:bg-blue-100 dark:hover:bg-blue-900/40"
  );

  const inactiveButtonClasses = cn(
    buttonClasses,
    "text-neutral-600 dark:text-neutral-300",
    "hover:bg-neutral-50 dark:hover:bg-neutral-800",
    "hover:text-neutral-900 dark:hover:text-neutral-100"
  );

  const navigationButtonClasses = cn(
    buttonClasses,
    "text-neutral-600 dark:text-neutral-300",
    "hover:bg-neutral-50 dark:hover:bg-neutral-800",
    "hover:text-neutral-900 dark:hover:text-neutral-100",
    "border border-neutral-200 dark:border-neutral-700",
    "disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"
  );

  const selectClasses = cn(
    "block h-9 pl-3 pr-8 text-sm transition-colors duration-200",
    "rounded-md border-neutral-200 dark:border-neutral-700",
    "bg-white dark:bg-neutral-800",
    "text-neutral-900 dark:text-neutral-100",
    "focus:border-blue-500 dark:focus:border-blue-400",
    "focus:ring-blue-500 dark:focus:ring-blue-400",
    "hover:border-neutral-300 dark:hover:border-neutral-600"
  );

  // Responsive pagination logic
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-3 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
      {/* Top section - Rows per page and info */}
      <div className="flex flex-wrap items-center gap-4">
        {showRowsPerPage && rowsPerPageOptions && onRowsPerPageChange && (
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-neutral-600 dark:text-neutral-300 whitespace-nowrap">
              Rows per page
            </label>
            <div className="relative">
              <select
                value={rowsPerPage}
                onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
                className={selectClasses}
              >
                {rowsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        {showCurrentPageReport && (
          <div className="flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-300">
            <span className="font-medium">{startRow}</span>
            <span>-</span>
            <span className="font-medium">{endRow}</span>
            <span>of</span>
            <span className="font-medium">{totalRows}</span>
          </div>
        )}
      </div>

      {/* Bottom section - Pagination controls */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(navigationButtonClasses, "rounded-l-lg")}
          aria-label="Previous page"
        >
          <span className="sr-only sm:not-sr-only">Previous</span>
          <svg
            className="h-5 w-5 sm:hidden"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="hidden sm:flex sm:items-center sm:gap-1">
          {getVisiblePages().map((page, index) =>
            typeof page === "number" ? (
              <button
                key={index}
                onClick={() => onPageChange(page)}
                className={
                  page === currentPage
                    ? activeButtonClasses
                    : inactiveButtonClasses
                }
              >
                {page}
              </button>
            ) : (
              <span
                key={index}
                className="w-9 text-center text-sm text-neutral-500 dark:text-neutral-400"
              >
                {page}
              </span>
            )
          )}
        </div>

        {/* Mobile current page indicator */}
        <div className="flex items-center gap-1.5 sm:hidden">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(navigationButtonClasses, "rounded-r-lg")}
          aria-label="Next page"
        >
          <span className="sr-only sm:not-sr-only">Next</span>
          <svg
            className="h-5 w-5 sm:hidden"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
