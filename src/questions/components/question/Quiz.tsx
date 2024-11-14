import { getAuthenticatedUser } from "@/auth/getAuthenticatedUser";
import NewComment from "@/comment/components/NewComment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { generateQuizAction } from "@/questions/actions/question/generateQuizAction";
import { ReadQuestionDto } from "@/questions/models/question";
import { SignedIn } from "@clerk/nextjs";
import { MessageCircle } from "lucide-react";
import React from "react";

import QuestionCard from "./QuestionCard";

type QuizProps = {
  topics: {
    id: number;
    name: string;
  }[];
};

const Quiz = async ({ topics }: QuizProps) => {
  const questions = await generateQuizAction(topics.map((item) => item.id));
  return (
    <div className="flex gap-4 flex-col flex-wrap mt-5">
      {questions.length === 0 ? (
        <div className="flex justify-center">
          <h4>No questions available for the selected topic/s</h4>
        </div>
      ) : (
        questions.map((question) => {
          return <QuestionCard key={question.id} question={question} />;
        })
      )}
    </div>
  );
};

export default Quiz;
