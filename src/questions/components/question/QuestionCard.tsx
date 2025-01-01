"use client";

import CommentList from "@/comment/components/CommentList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ReadQuestionDto } from "@/questions/models/question";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type QuestionCardProps = {
  question: ReadQuestionDto;
  readonly?: boolean;
  detail?: boolean;
};

const QuestionCard = ({
  question,
  readonly,
  detail = false,
}: QuestionCardProps) => {
  const [showComments, setShowComments] = useState(detail ? true : false);

  const handleShowCommentsOnClick = () => {
    setShowComments((prevState) => !prevState);
  };

  return (
    <Card key={question.id} className="rounded-b-none">
      <CardHeader>
        <CardTitle>
          <Link
            href={`/questions/browse/${question.id}`}
            className="hover:underline"
          >
            {question.question}
          </Link>
        </CardTitle>
      </CardHeader>
      <Separator className="my-2 bg-transparent bg-gradient-to-r from-transparent via-primary" />
      {!readonly && (
        <CardContent className="flex flex-col items-baseline">
          {!detail && (
            <>
              <Button
                title="Show Answers"
                size="sm"
                className="gap-1 text-primary"
                variant="ghost"
                onClick={handleShowCommentsOnClick}
              >
                <MessageCircle />
                <span>Answers</span>
              </Button>
              <Separator className="my-2 bg-transparent bg-gradient-to-r from-transparent via-primary" />
            </>
          )}
          {/* Comments should be here */}
          <CommentList
            questionId={question.id}
            questionAuthorId={question.authorId}
            showComments={showComments}
          />
        </CardContent>
      )}
    </Card>
  );
};

export default QuestionCard;
