"use client";

import DeleteAlert from "@/components/deleteAlert/DeleteAlert";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/dataTable";
import { useToast } from "@/components/ui/use-toast";
import { deleteQuestionAction } from "@/questions/actions/question/deleteQuestionAction";
import { ReadQuestionDto } from "@/questions/models/question";
import { RowSelectionState } from "@tanstack/react-table";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import QuestionDrawer from "./QuestionDrawer";
import { tableQuestionColumns } from "./QuestionTableColumns";

type QuestionTableProps = {
  questions: ReadQuestionDto[];
};

const QuestionTable = ({ questions }: QuestionTableProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});

  const { toast } = useToast();

  const handleAddNewClick = () => {
    setOpenDrawer(true);
  };

  const handleDeleteAlertState = (open: boolean) => {
    setDeleteOpen(open);
  };

  const handleDeleteConfirm = async () => {
    try {
      // Call delete action
      const questionsToBeDeleted: ReadQuestionDto[] = [];

      Object.keys(selectedRows).forEach((item) => {
        questionsToBeDeleted.push(questions[parseInt(item)]);
      });
      const result = await deleteQuestionAction(questionsToBeDeleted);
      toast({
        variant: "success",
        title: "Questions deleted successfully",
      });
      setSelectedRows({});
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

  const handleDeleteClick = () => {
    setDeleteOpen(true);
  };

  const handleUpdateClick = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = (open: boolean) => {
    if (!open) {
      setSelectedRows({});
    }
    setOpenDrawer(open);
  };

  return (
    <>
      <QuestionDrawer
        open={openDrawer}
        handleDrawerOpenChange={handleDrawerClose}
        question={
          Object.keys(selectedRows).length === 1
            ? questions[parseInt(Object.keys(selectedRows)[0])]
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
          variant="outline"
          size="icon"
          title="Insert New Question"
          onClick={handleAddNewClick}
          //   disabled={Object.keys(selectedRows).length > 0}
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
          onClick={handleDeleteClick}
          disabled={Object.keys(selectedRows).length === 0}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <DataTable
        columns={tableQuestionColumns}
        data={questions}
        rowSelection={selectedRows}
        setRowSelection={setSelectedRows}
      />
    </>
  );
};

export default QuestionTable;
