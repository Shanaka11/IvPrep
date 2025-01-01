"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@/query/useQuery";
import { ReadQuestionDto } from "@/questions/models/question";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import React, { Fragment, useEffect } from "react";

import { GetCommentsForQuestionAction } from "../actions/GetCommentsForQuestionAction";
import { ReadCommentDto } from "../models/comment";
import Comment from "./Comment";
import CommentSkeleton from "./CommentSkeleton";
import NewComment from "./NewComment";

type CommentListProps = {
  questionId: number;
  questionAuthorId: ReadQuestionDto["authorId"];
  showComments: boolean;
};
const CommentList = ({
  questionId,
  showComments,
  questionAuthorId,
}: CommentListProps) => {
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
                questionAutherId={questionAuthorId}
                refreshCommentsList={handleNewCommentAdd}
              />
              <Separator className="my-2 bg-transparent bg-gradient-to-r from-transparent via-primary" />
            </Fragment>
          ))}

        {showComments && !comments && <CommentSkeleton />}

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
        <SignedOut>
          <Separator className="my-2 bg-transparent bg-gradient-to-r from-transparent via-primary" />
          <span className="w-full text-center">
            You must be signed in provide answers
          </span>
        </SignedOut>
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
              questionAutherId={questionAuthorId}
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
      <SignedOut>
        <span className="w-full text-center">
          You must be signed in provide answers
        </span>
      </SignedOut>
    </>
  );
};

export default CommentList;
