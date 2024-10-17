"use client";

import DeleteAlert from "@/components/deleteAlert/DeleteAlert";
import TableSearch from "@/components/table/TableSearch";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/dataTable";
import { useToast } from "@/components/ui/use-toast";
import { useCache } from "@/query/cache";
import { deleteTopicAction } from "@/questions/actions/topic/deleteTopicAction";
import { ReadTopicDto } from "@/questions/models/topic";
import { RowSelectionState } from "@tanstack/react-table";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";

import TopicDrawer from "./TopicDrawer";
import { topicTableColumns } from "./TopicTableColumns";

type TopicTableProps = {
  topics: ReadTopicDto[];
  searchString: string | null;
};

const TopicTable = ({ topics, searchString }: TopicTableProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});

  const { invalidateCache } = useCache();
  const { toast } = useToast();

  const handleAddNewClick = () => {
    setDrawerOpen(true);
  };

  const handleUpdateClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerOpenChange = (open: boolean) => {
    setDrawerOpen(open);
  };

  const handleDeleteClick = () => {
    // Show a dialog asking for confirmation
    setDeleteOpen(true);
  };

  const handleDeleteAlertState = (open: boolean) => {
    setDeleteOpen(open);
  };

  const handleDeleteConfirm = async () => {
    try {
      // Call delete action
      const topicsToBeDeleted: ReadTopicDto[] = [];

      Object.keys(selectedRows).forEach((item) => {
        topicsToBeDeleted.push(topics[parseInt(item)]);
      });
      const result = await deleteTopicAction(topicsToBeDeleted);
      toast({
        variant: "success",
        title: "Topics deleted successfully",
      });
      setSelectedRows({});
      // Invalidate topic cache
      invalidateCache("topics");
    } catch (error: unknown) {
      // Show error toast
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
        return;
      }
      throw error;
    }
  };

  return (
    <>
      <TopicDrawer
        open={drawerOpen}
        handleDrawerOpenChange={handleDrawerOpenChange}
        topic={
          Object.keys(selectedRows).length === 1
            ? topics[parseInt(Object.keys(selectedRows)[0])]
            : undefined
        }
      />
      <DeleteAlert
        open={deleteOpen}
        onOpenChange={handleDeleteAlertState}
        handleOnConfirm={handleDeleteConfirm}
        itemCount={Object.keys(selectedRows).length}
      />
      <div className="flex gap-2">
        {/* When clicked open the drawer with edit form */}
        <Button
          size="icon"
          title="Insert New Topic"
          onClick={handleAddNewClick}
          disabled={Object.keys(selectedRows).length > 0}
        >
          <Plus className="h-4 w-4" />
        </Button>
        {/* Open the drawer with edit form, only available when single row is selected */}
        <Button
          size="icon"
          title="Update Selected Topic"
          onClick={handleUpdateClick}
          disabled={Object.keys(selectedRows).length !== 1}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        {/* Show a dialog asking for confirmation */}
        <Button
          size="icon"
          title="Delete Selected Topic"
          onClick={handleDeleteClick}
          disabled={Object.keys(selectedRows).length === 0}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <TableSearch searchString={searchString} />
      <DataTable
        columns={topicTableColumns}
        data={topics}
        rowSelection={selectedRows}
        setRowSelection={setSelectedRows}
      />
    </>
  );
};

export default TopicTable;
