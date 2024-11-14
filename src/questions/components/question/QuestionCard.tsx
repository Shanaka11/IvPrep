"use client";

import CommentList from "@/comment/components/CommentList";
import NewComment from "@/comment/components/NewComment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ReadQuestionDto } from "@/questions/models/question";
import { SignedIn } from "@clerk/nextjs";
import { MessageCircle } from "lucide-react";
import React, { Suspense, useState } from "react";

type QuestionCardProps = {
  question: ReadQuestionDto;
};

const QuestionCard = ({ question }: QuestionCardProps) => {
  const [showComments, setShowComments] = useState(false);

  const handleShowCommentsOnClick = () => {
    setShowComments((prevState) => !prevState);
  };

  return (
    <Card key={question.id} className="rounded-b-none">
      <CardHeader>
        <CardTitle>{question.question}</CardTitle>
      </CardHeader>
      <Separator className="my-2 bg-transparent bg-gradient-to-r from-transparent via-primary" />
      <CardContent className="flex flex-col items-baseline">
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
        {/* Comments should be here */}
        {showComments && (
          <>
            <Suspense fallback={<h1>"Loading"</h1>}>
              <CommentList questionId={question.id} />
            </Suspense>

            <SignedIn>
              <NewComment questionId={question.id} />
            </SignedIn>
          </>
        )}
        {/* New Comments Only show this if logged in*/}
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
