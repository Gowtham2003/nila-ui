"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Column, Table } from "@nila-ui/table";

interface User {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
  joinDate: string;
  progress: number;
  salary: number;
}

// Sample data for demonstration
const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    joinDate: "2023-01-15",
    progress: 75,
    salary: 65000,
  },
  {
    id: 2,
    name: "Alice Smith",
    email: "alice@example.com",
    status: "inactive",
    joinDate: "2022-05-20",
    progress: 30,
    salary: 72000,
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "pending",
    joinDate: "2023-06-10",
    progress: 50,
    salary: 58000,
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma@example.com",
    status: "active",
    joinDate: "2022-11-05",
    progress: 90,
    salary: 80000,
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael@example.com",
    status: "pending",
    joinDate: "2023-03-22",
    progress: 45,
    salary: 67000,
  },
  {
    id: 6,
    name: "Sarah Davis",
    email: "sarah@example.com",
    status: "active",
    joinDate: "2022-08-14",
    progress: 82,
    salary: 75000,
  },
  {
    id: 7,
    name: "James Miller",
    email: "james@example.com",
    status: "inactive",
    joinDate: "2023-02-28",
    progress: 15,
    salary: 59000,
  },
  {
    id: 8,
    name: "Linda Wilson",
    email: "linda@example.com",
    status: "active",
    joinDate: "2022-12-10",
    progress: 68,
    salary: 71000,
  },
];

export default function TestPage() {
  const [showData, setShowData] = useState(true);
  const [emptyStateCustomized, setEmptyStateCustomized] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);

  // Custom status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const getStatusColor = () => {
      switch (status) {
        case "active":
          return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
        case "inactive":
          return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
        case "pending":
          return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
        default:
          return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      }
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Custom progress bar component
  const ProgressBar = ({ value }: { value: number }) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const emptyStateConfig = emptyStateCustomized
    ? {
        title: "No users found",
        description: "Try adding new users or adjusting your search criteria.",
      }
    : undefined;

  // Optimize the row click handler with useCallback to prevent recreation on each render
  const handleRowClick = useCallback(
    (row: User) => {
      // Only update if it's a different user to avoid unnecessary re-renders
      if (!selectedUser || selectedUser.id !== row.id) {
        setIsSelecting(true);
        // Use setTimeout to defer the state update, reducing the blocking time
        setTimeout(() => {
          setSelectedUser(row);
          setIsSelecting(false);
        }, 0);
      }
    },
    [selectedUser]
  );

  // Use useMemo for the rendered users to avoid recalculation on every render
  const displayUsers = useMemo(() => {
    return showData ? users.slice(0, 4) : [];
  }, [showData]);

  const allDisplayUsers = useMemo(() => {
    return showData ? users : [];
  }, [showData]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Table Component Examples</h1>

      {/* Example Controls */}
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setShowData(!showData)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showData ? "Show Empty State" : "Show Data"}
        </button>
        {!showData && (
          <button
            onClick={() => setEmptyStateCustomized(!emptyStateCustomized)}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            {emptyStateCustomized
              ? "Use Default Empty State"
              : "Use Custom Empty State"}
          </button>
        )}
      </div>

      {/* Selected User Display with loading indicator */}
      {selectedUser && (
        <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
              {isSelecting ? (
                <span className="inline-flex items-center">
                  Selecting<span className="animate-pulse ml-2">...</span>
                </span>
              ) : (
                `Selected: ${selectedUser.name}`
              )}
            </h3>
            <button
              onClick={() => setSelectedUser(null)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Example 1: Basic Table */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">1. Basic Table</h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          A simple table displaying data with default styling.
        </p>
        <Table value={showData ? users.slice(0, 4) : []}>
          <Column field="id" header="ID" />
          <Column field="name" header="Name" />
          <Column field="email" header="Email" />
          <Column field="status" header="Status" />
        </Table>
      </div>

      {/* Example 2: Sortable Table */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">2. Sortable Table</h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          A table with sortable columns. Click on column headers to sort.
        </p>
        <Table value={showData ? users.slice(0, 4) : []}>
          <Column field="id" header="ID" sortable />
          <Column field="name" header="Name" sortable />
          <Column field="email" header="Email" sortable />
          <Column field="status" header="Status" sortable />
        </Table>
      </div>

      {/* Example 3: Custom Cell Rendering */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">3. Custom Cell Rendering</h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          A table with custom cell rendering using the <code>body</code> prop.
        </p>
        <Table value={showData ? users.slice(0, 4) : []}>
          <Column field="id" header="ID" />
          <Column field="name" header="Name" />
          <Column
            field="status"
            header="Status"
            body={(rowData) => <StatusBadge status={rowData.status} />}
          />
          <Column
            field="progress"
            header="Progress"
            body={(rowData) => (
              <div className="flex items-center gap-2">
                <ProgressBar value={rowData.progress} />
                <span className="text-xs">{rowData.progress}%</span>
              </div>
            )}
          />
          <Column
            field="salary"
            header="Salary"
            body={(rowData) => formatCurrency(rowData.salary)}
          />
          <Column
            field="joinDate"
            header="Join Date"
            body={(rowData) => formatDate(rowData.joinDate)}
          />
        </Table>
      </div>

      {/* Example 4: Optimized Row Click Handling */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">4. Row Click Handling</h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          A table with optimized row click handling. Click on a row to select a
          user.
        </p>
        <Table value={displayUsers} onRowClick={handleRowClick} hoverable>
          <Column field="id" header="ID" />
          <Column field="name" header="Name" />
          <Column field="email" header="Email" />
          <Column
            field="status"
            header="Status"
            body={(rowData) => <StatusBadge status={rowData.status} />}
          />
        </Table>
      </div>

      {/* Example 5: Update to use memoized value */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">5. Pagination</h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          A table with pagination controls. Customize rows per page and navigate
          between pages.
        </p>
        <Table
          value={allDisplayUsers}
          paginator
          rows={3}
          rowsPerPageOptions={[3, 5, 10]}
          showCurrentPageReport
        >
          <Column field="id" header="ID" />
          <Column field="name" header="Name" />
          <Column field="email" header="Email" />
          <Column
            field="status"
            header="Status"
            body={(rowData) => <StatusBadge status={rowData.status} />}
          />
        </Table>
      </div>

      {/* Example 6: Styling Options */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">6. Styling Options</h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          A table with various styling options enabled.
        </p>
        <Table
          value={showData ? users.slice(0, 4) : []}
          showGridlines
          stripedRows
          hoverable
        >
          <Column field="id" header="ID" />
          <Column field="name" header="Name" />
          <Column field="email" header="Email" />
          <Column
            field="status"
            header="Status"
            body={(rowData) => <StatusBadge status={rowData.status} />}
          />
        </Table>
      </div>

      {/* Example 7: Empty State Customization */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          7. Empty State Customization
        </h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          A table with a custom empty state message when there's no data.
        </p>
        <Table
          value={[]}
          emptyState={{
            title: "No users available",
            description:
              "Try adding users from your dashboard or importing from a file.",
          }}
        >
          <Column field="id" header="ID" />
          <Column field="name" header="Name" />
          <Column field="email" header="Email" />
          <Column field="status" header="Status" />
        </Table>
      </div>

      {/* Example 8: Custom Column Styling */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">8. Custom Column Styling</h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          A table with custom styling for specific columns.
        </p>
        <Table value={showData ? users.slice(0, 4) : []}>
          <Column field="id" header="ID" className="text-gray-500" />
          <Column
            field="name"
            header="Name"
            className="font-medium text-blue-700 dark:text-blue-400"
            headerStyle={{ backgroundColor: "#f8fafc" }}
          />
          <Column
            field="status"
            header="Status"
            body={(rowData) => <StatusBadge status={rowData.status} />}
            bodyStyle={(rowData) => ({
              backgroundColor:
                rowData.status === "active"
                  ? "rgba(0, 255, 0, 0.05)"
                  : undefined,
            })}
          />
          <Column
            field="salary"
            header="Salary"
            body={(rowData) => formatCurrency(rowData.salary)}
            style={{ textAlign: "right" }}
          />
        </Table>
      </div>

      {/* Example 9: Update to use optimized row click */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          9. Complete Feature Table
        </h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          A comprehensive table example using multiple features together.
        </p>
        <Table
          value={allDisplayUsers}
          emptyState={emptyStateConfig}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 20]}
          showCurrentPageReport
          stripedRows
          hoverable
          showGridlines
          onRowClick={handleRowClick}
        >
          <Column field="id" header="ID" sortable />
          <Column field="name" header="Name" sortable />
          <Column field="email" header="Email" sortable />
          <Column
            field="status"
            header="Status"
            sortable
            body={(rowData) => <StatusBadge status={rowData.status} />}
          />
          <Column
            field="joinDate"
            header="Join Date"
            sortable
            body={(rowData) => formatDate(rowData.joinDate)}
          />
          <Column
            field="progress"
            header="Progress"
            sortable
            body={(rowData) => (
              <div className="flex items-center gap-2">
                <ProgressBar value={rowData.progress} />
                <span className="text-xs">{rowData.progress}%</span>
              </div>
            )}
          />
          <Column
            field="salary"
            header="Salary"
            sortable
            body={(rowData) => formatCurrency(rowData.salary)}
            style={{ textAlign: "right" }}
          />
        </Table>
      </div>

      {/* API Reference */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          Table Component API Reference
        </h2>
        <div className="prose dark:prose-invert max-w-none text-sm">
          <h3>Table Props</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left py-2 px-4 border-b">Prop</th>
                <th className="text-left py-2 px-4 border-b">Type</th>
                <th className="text-left py-2 px-4 border-b">Default</th>
                <th className="text-left py-2 px-4 border-b">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">
                  <code>value</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>T[]</code>
                </td>
                <td className="py-2 px-4 border-b">Required</td>
                <td className="py-2 px-4 border-b">
                  Data array to display in the table
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">
                  <code>children</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>ReactNode</code>
                </td>
                <td className="py-2 px-4 border-b">Required</td>
                <td className="py-2 px-4 border-b">Column components</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">
                  <code>isLoading</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>boolean</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>false</code>
                </td>
                <td className="py-2 px-4 border-b">
                  Shows loading spinner when true
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">
                  <code>onRowClick</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>(row: T) =&gt; void</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>undefined</code>
                </td>
                <td className="py-2 px-4 border-b">
                  Callback when a row is clicked
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">
                  <code>showGridlines</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>boolean</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>false</code>
                </td>
                <td className="py-2 px-4 border-b">
                  Shows borders between cells
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">
                  <code>stripedRows</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>boolean</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>false</code>
                </td>
                <td className="py-2 px-4 border-b">
                  Applies alternating row colors
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">
                  <code>hoverable</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>boolean</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>false</code>
                </td>
                <td className="py-2 px-4 border-b">
                  Applies hover effect to rows
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">
                  <code>paginator</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>boolean</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>false</code>
                </td>
                <td className="py-2 px-4 border-b">Enables pagination</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">
                  <code>emptyState</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>object</code>
                </td>
                <td className="py-2 px-4 border-b">Default messages</td>
                <td className="py-2 px-4 border-b">
                  Customize empty state message
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-6">Column Props</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left py-2 px-4 border-b">Prop</th>
                <th className="text-left py-2 px-4 border-b">Type</th>
                <th className="text-left py-2 px-4 border-b">Default</th>
                <th className="text-left py-2 px-4 border-b">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">
                  <code>field</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>keyof T</code>
                </td>
                <td className="py-2 px-4 border-b">Required*</td>
                <td className="py-2 px-4 border-b">
                  Data field to display (*required unless body is provided)
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">
                  <code>header</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>string</code>
                </td>
                <td className="py-2 px-4 border-b">Required</td>
                <td className="py-2 px-4 border-b">Column header text</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">
                  <code>sortable</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>boolean</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>false</code>
                </td>
                <td className="py-2 px-4 border-b">Makes column sortable</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">
                  <code>body</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>(rowData: T) =&gt; ReactNode</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>undefined</code>
                </td>
                <td className="py-2 px-4 border-b">
                  Custom cell rendering function
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">
                  <code>headerStyle</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>CSSProperties</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>undefined</code>
                </td>
                <td className="py-2 px-4 border-b">
                  Inline style for header cell
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">
                  <code>bodyStyle</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>
                    CSSProperties | ((rowData: T) =&gt; CSSProperties)
                  </code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>undefined</code>
                </td>
                <td className="py-2 px-4 border-b">
                  Inline style for body cells
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">
                  <code>className</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>string | ((rowData: T) =&gt; string)</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>undefined</code>
                </td>
                <td className="py-2 px-4 border-b">CSS class for body cells</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">
                  <code>style</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>CSSProperties</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>undefined</code>
                </td>
                <td className="py-2 px-4 border-b">
                  Inline style for all cells in column
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">
                  <code>onSort</code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>
                    (value1: T, value2: T, direction: "asc" | "desc") =&gt;
                    number
                  </code>
                </td>
                <td className="py-2 px-4 border-b">
                  <code>undefined</code>
                </td>
                <td className="py-2 px-4 border-b">
                  Custom sort function for column
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
