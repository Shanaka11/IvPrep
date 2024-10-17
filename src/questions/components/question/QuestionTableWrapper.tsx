import { getUserQuestionsAction } from "@/questions/actions/question/getUserQuestionsAction";
import React from "react";

import QuestionTable from "./QuestionTable";

type QuestionTableWrapperProps = {
  searchString: string | null;
  topics: { id: number; name: string }[];
};

const QuestionTableWrapper = async ({
  searchString,
  topics,
}: QuestionTableWrapperProps) => {
  // get all questions

  const questions = await getUserQuestionsAction({
    searchString,
    topicIds: topics.length > 0 ? topics.map((item) => item.id) : null,
  });

  return (
    <QuestionTable
      questions={questions}
      searchString={searchString}
      topicIds={topics.map((item) => item.id)}
    />
  );
};

export default QuestionTableWrapper;
