"use client";

import TableSearch from "@/components/table/TableSearch";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/dataTable";
import { ReadTopicDto } from "@/questions/models/topic";
import { RowSelectionState } from "@tanstack/react-table";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";

import TopicDrawer from "./TopicDrawer";
import { topicTableColumns } from "./TopicTableColumns";

type TopicTableProps = {
  topics: ReadTopicDto[];
  searchString?: string;
};

const TopicTable = ({ topics, searchString }: TopicTableProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});

  const handleAddNewClick = () => {
    setDrawerOpen(true);
  };

  const handleUpdateClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerOpenChange = (open: boolean) => {
    setDrawerOpen(open);
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
      <div className="flex gap-2">
        {/* When clicked open the drawer with edit form */}
        <Button
          variant="outline"
          size="icon"
          title="Insert New Topic"
          onClick={handleAddNewClick}
          disabled={Object.keys(selectedRows).length > 0}
        >
          <Plus className="h-4 w-4" />
        </Button>
        {/* Open the drawer with edit form, only available when single row is selected */}
        <Button
          variant="outline"
          size="icon"
          title="Update Selected Topic"
          onClick={handleUpdateClick}
          disabled={Object.keys(selectedRows).length !== 1}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        {/* Show a dialog asking for confirmation */}
        <Button
          variant="outline"
          size="icon"
          title="Delete Selected Topic"
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
