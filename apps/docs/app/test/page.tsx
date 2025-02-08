"use client";

import React from "react";
import { Column, Table } from "@nila-ui/table";
export default function TestPage() {
  return (
    <div>
      <Table value={[]}>
        <Column field="name" header="Name" />
      </Table>
    </div>
  );
}
