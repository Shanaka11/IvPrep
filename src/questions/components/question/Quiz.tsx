import { Textarea } from "@/components/ui/textarea";
import { ReadQuestionDto } from "@/questions/models/question";
import React from "react";

type QuizProps = {
  questions: ReadQuestionDto[];
};

const Quiz = ({ questions }: QuizProps) => {
  return (
    <div className="flex gap-4 flex-col flex-wrap mt-5">
      {questions.map((question, index) => {
        return (
          <div
            className="p-5 border rounded-xl min-h-14 grow flex flex-col gap-2"
            key={question.id}
          >
            <div className="text-sm text-primary w-full">
              Question {index + 1}
            </div>
            <div className="w-full">{question.question}</div>
            <Textarea className="w-full mt-2" placeholder="Answer" rows={3} />
          </div>
        );
      })}
    </div>
  );
};

export default Quiz;
