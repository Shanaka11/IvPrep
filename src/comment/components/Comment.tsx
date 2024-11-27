"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCache } from "@/query/cache";
import { Pencil, Save, Trash2, X } from "lucide-react";
import React, { useState, useTransition } from "react";

import { deleteCommentAction } from "../actions/DeleteCommentAction";
import { ReadCommentDto } from "../models/comment";

type CommentProps = {
  comment: ReadCommentDto;
  refreshCommentsList: () => void;
};

const Comment = ({ comment, refreshCommentsList }: CommentProps) => {
  const [editMode, setEditMode] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { invalidateCache } = useCache();

  const handleEditOnClick = () => {
    setEditMode(true);
  };

  const handleCancleOnClick = () => {
    setEditMode(false);
  };

  const handleDeleteOnClick = async (comment: ReadCommentDto) => {
    // Delete comment
    try {
      await deleteCommentAction(comment);
      toast({
        variant: "success",
        title: "Comment deleted successfully",
      });
      invalidateCache(`comments, ${comment.questionId}`);
      refreshCommentsList();
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
    <div className="p-6 w-full">
      <span>{comment.comment}</span>
      <div className="flex justify-end gap-2">
        {editMode ? (
          <>
            <Button title="Save" size="icon" variant="ghost">
              <Save size="16" />
            </Button>
            <Button
              title="Cancel"
              size="icon"
              variant="ghost"
              onClick={handleCancleOnClick}
            >
              <X size="16" />
            </Button>
          </>
        ) : (
          <>
            <Button
              title="Edit"
              size="icon"
              variant="ghost"
              onClick={handleEditOnClick}
              disabled={isPending}
            >
              <Pencil size="16" />
            </Button>
            <Button
              title="Delete"
              size="icon"
              variant="ghost"
              onClick={() =>
                startTransition(() => handleDeleteOnClick(comment))
              }
              disabled={isPending}
            >
              <Trash2 size="16" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
