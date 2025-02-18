import { getUserQuestionsAction } from "@/questions/actions/question/getUserQuestionsAction";

import QuestionCard from "./QuestionCard";

type QuestionListProps = {
  searchString: string | null;
  topics: number[];
  getAll?: boolean;
};

const QuestionList = async ({
  searchString,
  topics,
  getAll,
}: QuestionListProps) => {
  const questions = await getUserQuestionsAction({
    searchString,
    topicIds: topics.length > 0 ? topics : null,
    getAll,
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
