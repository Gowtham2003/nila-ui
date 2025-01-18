"use client";

import React from "react";
import { Table, Column } from "@nila-ui/table";

export default function TestPage() {
  return (
    <div>
      <Table showGridlines value={[{ name: "John", age: 20 }]}>
        <Column header="Name" field="name" sortable />
        <Column
          header="Age"
          body={(row: { name: string; age: number }) => <div>{row.age}</div>}
        />
      </Table>
    </div>
  );
}
