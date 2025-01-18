export type ColumnProps<T> = {
  header: string;
  sortable?: boolean;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties | ((rowData: T) => React.CSSProperties);
  className?: string | ((rowData: T) => string);
  style?: React.CSSProperties;
} & (
  | {
      field: keyof T;
      body?: (rowData: T) => React.ReactNode;
    }
  | {
      field?: never;
      body: (rowData: T) => React.ReactNode;
    }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Column<T>(_props: ColumnProps<T>) {
  // This is a configuration component, it doesn't render anything
  return null;
}

// Add type guard to check if an element is a Column component
export function isColumn(element: React.ReactElement): boolean {
  return element.type === Column;
}
