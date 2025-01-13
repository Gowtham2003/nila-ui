export interface ColumnProps<T> {
  field: keyof T;
  header: string;
  sortable?: boolean;
  body?: (rowData: T) => React.ReactNode;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties | ((rowData: T) => React.CSSProperties);
  className?: string | ((rowData: T) => string);
  style?: React.CSSProperties;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Column<T>(_props: ColumnProps<T>) {
  // This is a configuration component, it doesn't render anything
  return null;
}

// Add type guard to check if an element is a Column component
export function isColumn(element: React.ReactElement): boolean {
  return element.type === Column;
}
