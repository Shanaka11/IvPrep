"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";

import TopicDrawer from "./TopicDrawer";

const TopicTable = () => {
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
      <div>
        {/* Table */}
        Table
      </div>
    </>
  );
};

export default TopicTable;
