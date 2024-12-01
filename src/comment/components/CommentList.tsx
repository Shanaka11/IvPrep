"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@/query/useQuery";
import { SignedIn } from "@clerk/nextjs";
import React, { Fragment, useEffect } from "react";

import { GetCommentsForQuestionAction } from "../actions/GetCommentsForQuestionAction";
import { ReadCommentDto } from "../models/comment";
import Comment from "./Comment";
import NewComment from "./NewComment";

type CommentListProps = {
  questionId: number;
  showComments: boolean;
};
const CommentList = ({ questionId, showComments }: CommentListProps) => {
  const {
    isLoading: commentLoading,
    data: comments,
    runQuery,
  } = useQuery<ReadCommentDto["questionId"], ReadCommentDto[]>({
    queryKey: `comments, ${questionId}`,
    queryFn: (questionId?: ReadCommentDto["questionId"]) => {
      if (questionId) {
        return GetCommentsForQuestionAction(questionId);
      }
      return Promise.resolve([]);
    },
    onlyOnDemand: true,
  });

  const handleNewCommentAdd = () => {
    runQuery(questionId);
  };

  useEffect(() => {
    if (showComments) {
      runQuery(questionId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showComments]);

  if (commentLoading) {
    return (
      <>
        {showComments &&
          comments?.map((comment) => (
            <Fragment key={comment.id}>
              <Comment
                comment={comment}
                refreshCommentsList={handleNewCommentAdd}
              />
              <Separator className="my-2 bg-transparent bg-gradient-to-r from-transparent via-primary" />
            </Fragment>
          ))}

        {showComments && (
          <div className="flex gap-4 flex-col flex-wrap w-full mt-2 p-4">
            <Skeleton className="w-full h-4 rounded-lg" />
            <Skeleton className="w-full h-4 rounded-lg" />
            <Skeleton className="w-1/2 h-4 rounded-lg" />
          </div>
        )}
        <SignedIn>
          <NewComment
            questionId={questionId}
            handleNewCommentAdd={handleNewCommentAdd}
          />
        </SignedIn>
      </>
    );
  }

  if (comments?.length === 0 && showComments) {
    return (
      <>
        <div className="p-4 w-full text-center">No answers</div>
        <SignedIn>
          <NewComment
            questionId={questionId}
            handleNewCommentAdd={handleNewCommentAdd}
          />
        </SignedIn>
      </>
    );
  }

  return (
    <>
      {showComments &&
        comments?.map((comment) => (
          <Fragment key={comment.id}>
            <Comment
              comment={comment}
              refreshCommentsList={handleNewCommentAdd}
            />
            <Separator className="my-2 bg-transparent bg-gradient-to-r from-transparent via-primary" />
          </Fragment>
        ))}
      <SignedIn>
        <NewComment
          questionId={questionId}
          handleNewCommentAdd={handleNewCommentAdd}
        />
      </SignedIn>
    </>
  );
};

export default CommentList;
