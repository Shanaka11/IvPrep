"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ReadTopicDto } from "@/questions/models/topic";
import { ColumnDef } from "@tanstack/react-table";

export const topicTableColumns: ColumnDef<ReadTopicDto>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllRowsSelected() ||
          (table.getIsSomeRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Select all rows"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select this row"
        className="translate-y-[2px]"
      />
    ),
    size: 50,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    size: 50,
  },
  {
    accessorKey: "name",
    header: "Topic",
  },
];
