import TableLoading from "@/components/table/TableLoading";
import TableSearch from "@/components/table/TableSearch";
import { Button } from "@/components/ui/button";
import { topicTableColumns } from "@/questions/components/topic/TopicTableColumns";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React from "react";

const TopicTableLoading = () => {
  return (
    <>
      <div className="flex gap-2">
        {/* When clicked open the drawer with edit form */}
        <Button
          size="icon"
          title="Insert New Question"
          disabled={true}

          //   disabled={Object.keys(selectedRows).length > 0}
        >
          <Plus className="h-4 w-4" />
        </Button>
        {/* Open the drawer with edit form, only available when single row is selected */}
        <Button size="icon" title="Update Selected Topic" disabled={true}>
          <Pencil className="h-4 w-4" />
        </Button>
        {/* Show a dialog asking for confirmation */}
        <Button size="icon" title="Delete Selected Topic" disabled={true}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <TableSearch searchString={""} />
      <TableLoading columns={topicTableColumns} />
    </>
  );
};

export default TopicTableLoading;
