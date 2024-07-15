"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

import QuestionDrawer from "./QuestionDrawer";

const QuestionTable = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleAddNewClick = () => {
    setOpenDrawer(true);
  };

  return (
    <>
      <QuestionDrawer
        open={openDrawer}
        handleDrawerOpenChange={setOpenDrawer}
      />
      <div className="flex gap-2">
        {/* When clicked open the drawer with edit form */}
        <Button
          variant="outline"
          size="icon"
          title="Insert New Question"
          onClick={handleAddNewClick}
          //   disabled={Object.keys(selectedRows).length > 0}
        >
          <Plus className="h-4 w-4" />
        </Button>
        {/* Open the drawer with edit form, only available when single row is selected */}
        {/* <Button
          variant="outline"
          size="icon"
          title="Update Selected Topic"
          onClick={handleUpdateClick}
          disabled={Object.keys(selectedRows).length !== 1}
        >
          <Pencil className="h-4 w-4" />
        </Button> */}
        {/* Show a dialog asking for confirmation */}
        {/* <Button
          variant="outline"
          size="icon"
          title="Delete Selected Topic"
          onClick={handleDeleteClick}
          disabled={Object.keys(selectedRows).length === 0}
        >
          <Trash2 className="h-4 w-4" />
        </Button> */}
      </div>
    </>
  );
};

export default QuestionTable;
