import { ColumnDef } from "@tanstack/react-table";
import React from "react";

import { Skeleton } from "../ui/skeleton";
import { Table, TableHead, TableHeader } from "../ui/table";

type TableLoadingProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
};

const TableLoading = <TData, TValue>({
  columns,
}: TableLoadingProps<TData, TValue>) => {
  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          {columns.map((column, index) => {
            return (
              <TableHead
                key={index}
                style={{ width: column.size === -1 ? "auto" : column.size }}
              >
                {typeof column.header === "string" ? column.header : <></>}
              </TableHead>
            );
          })}
        </TableHeader>
      </Table>
      <div className="flex flex-col gap-2">
        <Skeleton className="w-full h-12 rounded-none" />
        <Skeleton className="w-full h-12 rounded-none" />
        <Skeleton className="w-full h-12 rounded-none" />
        <Skeleton className="w-full h-12 rounded-none" />
        <Skeleton className="w-full h-12 rounded-none" />
        <Skeleton className="w-full h-12 rounded-none" />
        <Skeleton className="w-full h-12 rounded-none" />
        <Skeleton className="w-full h-12 rounded-none" />
        <Skeleton className="w-full h-12 rounded-none" />
      </div>
    </div>
  );
};

export default TableLoading;
