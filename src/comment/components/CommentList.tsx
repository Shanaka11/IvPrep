import { Separator } from "@/components/ui/separator";
import React from "react";

import { GetCommentsForQuestionAction } from "../actions/GetCommentsForQuestionAction";
import Comment from "./Comment";

type CommentListProps = {
  questionId: number;
};

//TODO: Make this a client component to add caching
const CommentList = async ({ questionId }: CommentListProps) => {
  const comments = await GetCommentsForQuestionAction(questionId);

  if (comments.length === 0) {
    return <div className="p-4 w-full text-center">No answers</div>;
  }

  return (
    <>
      {comments.map((comment) => (
        <>
          <Comment key={comment.id} comment={comment} />
          <Separator className="my-2 bg-transparent bg-gradient-to-r from-transparent via-primary" />
        </>
      ))}
    </>
  );
};

export default CommentList;
