"use client";

import React, { useState } from "react";
import { Column, Table } from "@nila-ui/table";

interface User {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
  joinDate: string;
  progress: number;
}

// Sample data with different types for sorting demonstration
const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    joinDate: "2023-01-15",
    progress: 75,
  },
  {
    id: 2,
    name: "Alice Smith",
    email: "alice@example.com",
    status: "inactive",
    joinDate: "2022-05-20",
    progress: 30,
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "pending",
    joinDate: "2023-06-10",
    progress: 50,
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma@example.com",
    status: "active",
    joinDate: "2022-11-05",
    progress: 90,
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael@example.com",
    status: "pending",
    joinDate: "2023-03-22",
    progress: 45,
  },
];

export default function TestPage() {
  const [showData, setShowData] = useState(true);
  const [emptyStateCustomized, setEmptyStateCustomized] = useState(false);

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

  const emptyStateConfig = emptyStateCustomized
    ? {
        title: "No users found",
        description: "Try adding new users or adjusting your search criteria.",
      }
    : undefined;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Table Component Examples</h1>

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

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Basic Table Example</h2>
        <div className="mb-2 text-sm text-gray-500">
          {showData ? "Showing user data" : "Showing empty state"}
        </div>
        <Table
          value={showData ? users : []}
          emptyState={emptyStateConfig}
          hoverable
          stripedRows
          showGridlines
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
            body={(rowData) => {
              const date = new Date(rowData.joinDate);
              return date.toLocaleDateString();
            }}
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
        </Table>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Empty State Customization
        </h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            The table supports customizing the empty state message through the{" "}
            <code>emptyState</code> prop:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto">
            {`<Table 
  value={[]} 
  emptyState={{
    title: "No users found",
    description: "Try adding new users or adjusting your search criteria."
  }}
>
  {/* columns */}
</Table>`}
          </pre>

          <p className="mt-6">
            Toggle between the default and custom empty state messages using the
            buttons above.
          </p>
        </div>
      </div>
    </div>
  );
}
