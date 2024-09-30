import { Separator } from "@/components/ui/separator";
import { generateQuizAction } from "@/questions/actions/question/generateQuizAction";
import QuestionGenerator from "@/questions/components/question/QuestionGenerator";
import Quiz from "@/questions/components/question/Quiz";
import { parseTopics } from "@/util/parseTopics";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const topics = parseTopics(searchParams.topic);

  const questions = await generateQuizAction(topics.map((item) => item.id));
  return (
    <div className="p-2 w-screen container">
      <QuestionGenerator topics={topics} small />
      <Separator className="my-2 bg-transparent bg-gradient-to-r from-transparent via-primary" />
      <Quiz questions={questions} />
    </div>
  );
};

export default page;
