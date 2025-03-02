import React, { useState, useEffect } from "react";
import { cn } from "./lib/utils";

interface TablePaginatorProps {
  currentPage: number;
  totalRows: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  showRowsPerPage?: boolean;
  showCurrentPageReport?: boolean;
}

export function TablePaginator({
  currentPage,
  totalRows,
  rowsPerPage,
  rowsPerPageOptions = [5, 10, 20, 50],
  onPageChange,
  onRowsPerPageChange,
  showRowsPerPage = true,
  showCurrentPageReport = true,
}: TablePaginatorProps) {
  const [inputPage, setInputPage] = useState(currentPage.toString());

  useEffect(() => {
    setInputPage(currentPage.toString());
  }, [currentPage]);

  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(startRow + rowsPerPage - 1, totalRows);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value, 10);
    onRowsPerPageChange(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const page = parseInt(inputPage, 10);
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        handlePageChange(page);
      }
    }
  };

  const handleInputBlur = () => {
    const page = parseInt(inputPage, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      handlePageChange(page);
    } else {
      setInputPage(currentPage.toString());
    }
  };

  // Generate page navigation buttons
  const getPageNumbers = () => {
    const maxVisiblePages = 5;
    const pageNumbers = [];

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than or equal to max visible pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);

      // Calculate start and end of middle section
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust to show 3 pages in the middle
      if (startPage === 2) {
        endPage = Math.min(totalPages - 1, startPage + 2);
      } else if (endPage === totalPages - 1) {
        startPage = Math.max(2, endPage - 2);
      }

      // Add ellipsis if needed
      if (startPage > 2) {
        pageNumbers.push("ellipsis-start");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("ellipsis-end");
      }

      // Always include last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  const renderPageNumber = (pageNumber: number | string, idx: number) => {
    if (pageNumber === "ellipsis-start" || pageNumber === "ellipsis-end") {
      return (
        <span
          key={`ellipsis-${idx}`}
          className="px-2 py-1 text-neutral-500 dark:text-neutral-400"
        >
          ...
        </span>
      );
    }

    const isActive = pageNumber === currentPage;

    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber as number)}
        className={cn(
          "relative inline-flex items-center justify-center min-w-[32px] h-8 px-2 text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 focus:ring-offset-2",
          isActive
            ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 z-10"
            : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        )}
        aria-current={isActive ? "page" : undefined}
      >
        {pageNumber}
      </button>
    );
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center py-3 px-3 border-t border-neutral-200 dark:border-neutral-800 text-sm">
      <div className="flex items-center mb-3 sm:mb-0 text-neutral-500 dark:text-neutral-400">
        {showCurrentPageReport && (
          <span className="mr-4">
            Showing {startRow}-{endRow} of {totalRows}
          </span>
        )}

        {showRowsPerPage && (
          <div className="flex items-center">
            <span className="mr-2">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 rounded-md py-1 px-2 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600"
            >
              {rowsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-1">
        <button
          onClick={() => handlePageChange(1)}
          disabled={isFirstPage}
          className={cn(
            "relative inline-flex items-center justify-center min-w-[32px] h-8 px-2 text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600",
            isFirstPage
              ? "text-neutral-400 dark:text-neutral-600 cursor-not-allowed"
              : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          )}
          aria-label="First page"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={isFirstPage}
          className={cn(
            "relative inline-flex items-center justify-center min-w-[32px] h-8 px-2 text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600",
            isFirstPage
              ? "text-neutral-400 dark:text-neutral-600 cursor-not-allowed"
              : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          )}
          aria-label="Previous page"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {pageNumbers.map((pageNumber, idx) =>
          renderPageNumber(pageNumber as number | string, idx)
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={isLastPage}
          className={cn(
            "relative inline-flex items-center justify-center min-w-[32px] h-8 px-2 text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600",
            isLastPage
              ? "text-neutral-400 dark:text-neutral-600 cursor-not-allowed"
              : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          )}
          aria-label="Next page"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={isLastPage}
          className={cn(
            "relative inline-flex items-center justify-center min-w-[32px] h-8 px-2 text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600",
            isLastPage
              ? "text-neutral-400 dark:text-neutral-600 cursor-not-allowed"
              : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          )}
          aria-label="Last page"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
