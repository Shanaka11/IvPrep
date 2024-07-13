"user client";

import { ReadTopicDto } from "@/questions/models/topic";
import { ColumnDef } from "@tanstack/react-table";

export const topicTableColumns: ColumnDef<ReadTopicDto>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Topic",
  },
];
