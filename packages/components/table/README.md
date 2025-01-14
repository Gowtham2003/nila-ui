# @nilaui/table

A modern, flexible table component for React with built-in features like sorting, pagination, and dark mode support.

## Usage

```tsx
import { Table, Column } from "@nilaui/table";

function App() {
  const data = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ];

  return (
    <Table
      value={data}
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 25, 50]}
      tableStyle={{ minWidth: "50rem" }}
    >
      <Column field="name" header="Name" sortable />
      <Column field="email" header="Email" sortable />
    </Table>
  );
}
```

## Props

### Table Props

| Prop               | Type             | Default   | Description                        |
| ------------------ | ---------------- | --------- | ---------------------------------- |
| value              | T[]              | required  | Data array to display in the table |
| paginator          | boolean          | false     | Enable/disable pagination          |
| rows               | number           | 10        | Number of rows per page            |
| rowsPerPageOptions | number[]         | undefined | Options for rows per page selector |
| showGridlines      | boolean          | false     | Show grid lines between cells      |
| stripedRows        | boolean          | false     | Enable alternating row colors      |
| hoverable          | boolean          | false     | Enable hover effect on rows        |
| onRowClick         | (row: T) => void | undefined | Callback when row is clicked       |

### Column Props

| Prop     | Type                      | Default   | Description                 |
| -------- | ------------------------- | --------- | --------------------------- |
| field    | keyof T                   | required  | Field name from data object |
| header   | string                    | required  | Column header text          |
| sortable | boolean                   | false     | Enable sorting for column   |
| body     | (rowData: T) => ReactNode | undefined | Custom cell renderer        |
| style    | CSSProperties             | undefined | Custom column style         |
