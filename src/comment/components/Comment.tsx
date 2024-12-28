"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCache } from "@/query/cache";
import { timeParser } from "@/util/timeParser";
import { useAuth } from "@clerk/nextjs";
import { Pencil, Save, Trash2, X } from "lucide-react";
import React, { useState, useTransition } from "react";

import { deleteCommentAction } from "../actions/DeleteCommentAction";
import { markCommentAsAnswerAction } from "../actions/markCommentAsAnswerAction";
import { ReadCommentDto } from "../models/comment";
import EditComment from "./EditComment";

type CommentProps = {
  comment: ReadCommentDto;
  refreshCommentsList: () => void;
};

const Comment = ({ comment, refreshCommentsList }: CommentProps) => {
  const [editMode, setEditMode] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { invalidateCache } = useCache();

  const { userId } = useAuth();

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

  const handleMarkCorrectOnClick = async () => {
    try {
      await markCommentAsAnswerAction(comment.id);
      toast({
        variant: "success",
        title: "Comment updated successfully",
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

  const handleUpdateCommentSuccess = () => {
    setEditMode(false);
    refreshCommentsList();
  };

  return (
    <div className="p-6 w-full">
      {editMode ? (
        <EditComment
          text={comment.comment}
          comment={comment}
          handleCancelOnClick={handleCancleOnClick}
          handleUpdateCommentSuccess={handleUpdateCommentSuccess}
        />
      ) : (
        <>
          <span className="text-muted mb-3 block text-sm">
            {timeParser(comment.createdAt)}
          </span>
          <span>{comment.comment}</span>
        </>
      )}
      {/* show this only for the auther of the comments */}
      {userId === comment.authorId && (
        <div className="flex justify-end gap-2">
          {!editMode && (
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
              {!comment.isAnswer && (
                <Button
                  onClick={() =>
                    startTransition(() => handleMarkCorrectOnClick())
                  }
                >
                  Mark Correct
                </Button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;
