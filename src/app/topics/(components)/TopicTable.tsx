"use client";

import TableSearch from "@/components/table/TableSearch";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/dataTable";
import { ReadTopicDto } from "@/questions/models/topic";
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

  const handleAddNewClick = () => {
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
      />
      <div className="flex gap-2">
        {/* When clicked open the drawer with edit form */}
        <Button
          variant="outline"
          size="icon"
          title="Insert New Topic"
          onClick={handleAddNewClick}
        >
          <Plus className="h-4 w-4" />
        </Button>
        {/* Open the drawer with edit form, only available when single row is selected */}
        <Button variant="outline" size="icon" title="Update Selected Topic">
          <Pencil className="h-4 w-4" />
        </Button>
        {/* Show a dialog asking for confirmation */}
        <Button variant="outline" size="icon" title="Delete Selected Topic">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <TableSearch searchString={searchString} />
      <DataTable columns={topicTableColumns} data={topics} />
    </>
  );
};

export default TopicTable;
