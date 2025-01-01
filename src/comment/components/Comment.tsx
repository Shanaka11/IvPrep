"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCache } from "@/query/cache";
import { ReadQuestionDto } from "@/questions/models/question";
import { timeParser } from "@/util/timeParser";
import { useAuth } from "@clerk/nextjs";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Pencil,
  Save,
  Trash2,
  X,
} from "lucide-react";
import React, { useState, useTransition } from "react";

import { deleteCommentAction } from "../actions/DeleteCommentAction";
import { markCommentAsAnswerAction } from "../actions/markCommentAsAnswerAction";
import { ReadCommentDto } from "../models/comment";
import EditComment from "./EditComment";

type CommentProps = {
  comment: ReadCommentDto;
  questionAutherId: ReadQuestionDto["authorId"];
  refreshCommentsList: () => void;
};

const Comment = ({
  comment,
  questionAutherId,
  refreshCommentsList,
}: CommentProps) => {
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
    <div className="p-6 w-full flex gap-2">
      <div className="flex flex-col gap-2 items-center">
        {questionAutherId === userId ? (
          <Button
            onClick={() => startTransition(() => handleMarkCorrectOnClick())}
            title={comment.isAnswer ? "Unmark as correct" : "Mark as correct"}
            size="icon"
            variant="ghost"
            disabled={isPending || editMode}
          >
            <Check
              size={comment.isAnswer ? "28" : "16"}
              className={comment.isAnswer ? "stroke-primary" : "opacity-70"}
            />
          </Button>
        ) : (
          comment.isAnswer && <Check size="28" className="stroke-primary" />
        )}
        {/* <Button
          title="Upvote"
          size="icon"
          variant="ghost"
          onClick={handleEditOnClick}
          disabled={isPending}
        >
          <ChevronUp size="16" />
        </Button>
        <span className="text-l font-extrabold">125</span>
        <Button
          title="Downvote"
          size="icon"
          variant="ghost"
          onClick={handleEditOnClick}
          disabled={isPending}
        >
          <ChevronDown size="16" />
        </Button> */}
      </div>
      <div className="flex-grow">
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
