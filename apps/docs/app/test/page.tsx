"use client";

import React from "react";
import { Table, Column } from "@nila-ui/table";

export default function TestPage() {
  return (
    <div>
      <Table value={[{ name: "John", age: 20 }]}>
        <Column header="Name" field="name" />
        <Column header="Age" body={(row) => <div>{row.age}</div>} />
      </Table>
    </div>
  );
}
