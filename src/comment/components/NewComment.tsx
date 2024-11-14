"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Send, SendHorizonal } from "lucide-react";
import React, { useRef, useTransition } from "react";

import { createCommentAction } from "../actions/CreateCommentAction";
import { ReadCommentDto } from "../models/comment";

type NewCommentProps = {
  questionId: ReadCommentDto["questionId"];
};

const NewComment = ({ questionId }: NewCommentProps) => {
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const handleSubmit = async () => {
    try {
      if (commentRef.current !== null) {
        await createCommentAction({
          questionId: questionId,
          authorId: "1", // Dummy authorId, correct one will be set in the useCase
          comment: commentRef.current.value,
        });
        commentRef.current.value = "";
        toast({
          variant: "success",
          title: "Comment added successfully",
        });
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
    <div className="w-full mt-2 flex items-end gap-2 flex-col relative">
      <Textarea ref={commentRef} placeholder="Answer" rows={3} />
      <Button
        title="Answer"
        onClick={() => startTransition(handleSubmit)}
        disabled={isPending}
        size="icon"
        variant="ghost"
        className="absolute bottom-1 right-1 text-card hover:text-card"
      >
        <SendHorizonal className="fill-primary stroke-1" />
      </Button>
    </div>
  );
};

export default NewComment;