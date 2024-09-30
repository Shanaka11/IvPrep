import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ReadQuestionDto } from "@/questions/models/question";
import React from "react";

type QuizProps = {
  questions: ReadQuestionDto[];
};

const Quiz = ({ questions }: QuizProps) => {
  return (
    <div className="flex gap-4 flex-col flex-wrap mt-5">
      {questions.length === 0 ? (
        <div className="flex justify-center">
          <h4>No questions available for the selected topic/s</h4>
        </div>
      ) : (
        questions.map((question, index) => {
          return (
            <Card key={question.id}>
              <CardHeader>
                <CardTitle>{question.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  className="w-full mt-2"
                  placeholder="Answer"
                  rows={3}
                />
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default Quiz;
