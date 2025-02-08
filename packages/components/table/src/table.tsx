import React from "react";
import { useState, Children, isValidElement, useMemo } from "react";
import { isColumn } from "./column";
import type { ColumnProps } from "./column";
import { LoadingSpinner } from "./loading-spinner";
import { SortIcon } from "./sort-icon";
import { TablePaginator } from "./table-paginator";
import { cn } from "./lib/utils";

export interface TableProps<T> {
  value: T[];
  children: React.ReactNode;
  isLoading?: boolean;
  onRowClick?: (row: T) => void;
  tableStyle?: React.CSSProperties;
  showGridlines?: boolean;
  stripedRows?: boolean;
  hoverable?: boolean;
  // Pagination props
  paginator?: boolean;
  rows?: number;
  rowsPerPageOptions?: number[];
  showRowsPerPage?: boolean;
  showCurrentPageReport?: boolean;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
}

type ExtractColumnField<T> = {
  [K in keyof T]: T[K] extends string | number ? K : never;
}[keyof T];

export function Table<T>({
  value,
  children,
  isLoading = false,
  onRowClick,
  tableStyle,
  showGridlines = false,
  stripedRows = false,
  hoverable = false,
  // Pagination props
  paginator = false,
  rows = 10,
  rowsPerPageOptions,
  showRowsPerPage = true,
  showCurrentPageReport = true,
  onPageChange,
  onRowsPerPageChange,
}: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rows);

  // Extract column configurations from children with improved type safety
  const columns = Children.toArray(children)
    .filter(
      (child): child is React.ReactElement<ColumnProps<T>> =>
        isValidElement(child) && isColumn(child)
    )
    .map((column: React.ReactElement<ColumnProps<T>>) => {
      const field = column.props.field;
      return {
        header: column.props.header,
        accessor: field as ExtractColumnField<T> | undefined,
        sortable: column.props.sortable && field !== undefined,
        body: column.props.body,
        headerStyle: column.props.headerStyle,
        bodyStyle: column.props.bodyStyle,
        className: column.props.className,
        style: column.props.style,
      };
    });

  const handleSort = (accessor: keyof T | undefined, sortable?: boolean) => {
    if (!sortable || !accessor) return;

    setSortConfig((currentSort) => ({
      key: accessor,
      direction:
        currentSort.key === accessor && currentSort.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  // Memoize sorted data to prevent unnecessary re-sorting
  const sortedData = useMemo(() => {
    const sorted = [...value].sort((a, b) => {
      if (!sortConfig.key) return 0;

      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [value, sortConfig]);

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange?.(page);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to first page when changing rows per page
    onRowsPerPageChange?.(newRowsPerPage);
  };

  // Calculate paginated data
  const paginatedData = useMemo(() => {
    if (!paginator) return sortedData;

    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage, paginator]);

  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const tableClasses = cn(
    "w-full table-auto",
    showGridlines && [
      "[&_td]:border [&_th]:border",
      "border-neutral-200 dark:border-neutral-700",
    ]
  );

  if (value.length === 0) {
    return (
      <div className="w-full overflow-x-auto rounded-lg shadow bg-white dark:bg-neutral-800">
        <table className={tableClasses} style={tableStyle}>
          <thead className="bg-neutral-100 dark:bg-neutral-700 border-b border-neutral-200 dark:border-neutral-600">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={`${index}-${String(column.accessor ?? `col-${index}`)}`}
                  className={cn(
                    "px-6 py-3 text-left text-xs font-medium text-neutral-600 dark:text-neutral-300 uppercase tracking-wider",
                    cellClasses
                  )}
                  style={{ ...column.headerStyle, ...column.style }}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={columns.length} className="px-6 py-24 text-center">
                <div className="flex flex-col items-center justify-center gap-4">
                  <svg
                    className="w-16 h-16 text-neutral-300 dark:text-neutral-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                      No data available
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                      There are no items to display at the moment.
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  const rowClasses = (index: number) =>
    cn(
      "transition-colors",
      stripedRows && index % 2 === 0 && "bg-white dark:bg-neutral-800",
      stripedRows && index % 2 === 1 && "bg-neutral-100 dark:bg-neutral-700",
      hoverable && "hover:bg-neutral-200 dark:hover:bg-neutral-600",
      onRowClick && "cursor-pointer"
    );

  const cellClasses = cn(
    "px-6 py-4 text-sm",
    showGridlines ? "border-neutral-200 dark:border-neutral-700" : "border-0"
  );

  return (
    <div className="w-full overflow-x-auto rounded-lg shadow bg-white dark:bg-neutral-800">
      <table className={tableClasses} style={tableStyle}>
        <thead className="bg-neutral-100 dark:bg-neutral-700 border-b border-neutral-200 dark:border-neutral-600">
          <tr>
            {columns.map((column, index) => (
              <th
                key={`${index}-${String(column.accessor ?? `col-${index}`)}`}
                onClick={() => handleSort(column.accessor, column.sortable)}
                className={cn(
                  "px-6 py-3 text-left text-xs font-medium text-neutral-600 dark:text-neutral-300 uppercase tracking-wider",
                  column.sortable &&
                    "cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-600",
                  cellClasses
                )}
                style={{ ...column.headerStyle, ...column.style }}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.header}</span>
                  {column.sortable && (
                    <span className="ml-2">
                      <SortIcon
                        direction={
                          sortConfig.key === column.accessor
                            ? sortConfig.direction
                            : null
                        }
                      />
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
          {paginatedData.map((row, index) => (
            <tr
              key={index}
              onClick={() => onRowClick?.(row)}
              className={rowClasses(index)}
            >
              {columns.map((column, columnIndex) => {
                const bodyStyle =
                  typeof column.bodyStyle === "function"
                    ? column.bodyStyle(row)
                    : column.bodyStyle;

                const className =
                  typeof column.className === "function"
                    ? column.className(row)
                    : column.className;

                return (
                  <td
                    key={`${index}-${String(column.accessor ?? `col-${columnIndex}`)}`}
                    className={cn(
                      cellClasses,
                      "whitespace-nowrap text-neutral-900 dark:text-neutral-100",
                      className
                    )}
                    style={{ ...bodyStyle, ...column.style }}
                  >
                    {column.body
                      ? column.body(row)
                      : column.accessor
                        ? String(row[column.accessor])
                        : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {paginator && (
        <TablePaginator
          currentPage={currentPage}
          totalRows={value.length}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          showRowsPerPage={showRowsPerPage}
          showCurrentPageReport={showCurrentPageReport}
        />
      )}
    </div>
  );
}
