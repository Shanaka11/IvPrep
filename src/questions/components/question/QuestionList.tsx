import { getUserQuestionsAction } from "@/questions/actions/question/getUserQuestionsAction";

import QuestionCard from "./QuestionCard";

type QuestionListProps = {
  searchString: string | null;
  topics: number[];
};

const QuestionList = async ({ searchString, topics }: QuestionListProps) => {
  const questions = await getUserQuestionsAction({
    searchString,
    topicIds: topics.length > 0 ? topics : null,
  });
  return (
    <>
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} readonly={true} />
      ))}
    </>
  );
};

export default QuestionList;
