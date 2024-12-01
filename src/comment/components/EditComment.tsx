"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useCache } from "@/query/cache";
import { Save, X } from "lucide-react";
import React, { useRef, useTransition } from "react";

import { updateCommentAction } from "../actions/UpdateCommentAction";
import { ReadCommentDto } from "../models/comment";

type EditCommentProps = {
  text: string;
  comment: ReadCommentDto;
  handleCancelOnClick: () => void;
  handleUpdateCommentSuccess: () => void;
};

const EditComment = ({
  text,
  comment,
  handleCancelOnClick,
  handleUpdateCommentSuccess,
}: EditCommentProps) => {
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const { invalidateCache } = useCache();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleUpdateOnClick = async () => {
    try {
      if (commentRef.current !== null) {
        await updateCommentAction({
          ...comment,
          comment: commentRef.current.value,
        });
        commentRef.current.value = "";
        toast({
          variant: "success",
          title: "Comment updated successfully",
        });
        invalidateCache(`comments, ${comment.questionId}`);
        handleUpdateCommentSuccess();
      }
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
    <div>
      <Textarea
        ref={commentRef}
        defaultValue={text}
        placeholder="Answer"
        rows={3}
      />
      <div className="flex justify-end gap-2 mt-2">
        <>
          <Button
            title="Save"
            size="icon"
            variant="ghost"
            onClick={() => startTransition(handleUpdateOnClick)}
            disabled={isPending}
          >
            <Save size="16" />
          </Button>
          <Button
            title="Cancel"
            size="icon"
            variant="ghost"
            onClick={handleCancelOnClick}
            disabled={isPending}
          >
            <X size="16" />
          </Button>
        </>
      </div>
    </div>
  );
};

export default EditComment;
