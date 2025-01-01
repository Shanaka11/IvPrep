import { getQuestionByIdAction } from "@/questions/actions/question/getQuestionByIdAction";
import QuestionCard from "@/questions/components/question/QuestionCard";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: number }> }) => {
  const id = (await params).id;
  const question = await getQuestionByIdAction(id);
  return <QuestionCard question={question} key={question.id} detail={true} />;
};

export default page;
