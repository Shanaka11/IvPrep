import { getUserQuestionsAction } from "@/questions/actions/question/getUserQuestionsAction";
import QuestionTable from "@/questions/components/question/QuestionTable";
import { parseTopics } from "@/util/parseTopics";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // get all questions
  const searchString = searchParams.search
    ? (searchParams.search as string)
    : null;
  const topics = parseTopics(searchParams.topic);
  const questions = await getUserQuestionsAction({
    searchString,
    topicIds: topics.length > 0 ? topics.map((item) => item.id) : null,
  });

  return (
    <main className="flex flex-col gap-2 w-full max-w-screen-2xl px-6 mx-auto mt-4 container pb-6">
      <h1 className="text-2xl font-bold">Questions</h1>
      <QuestionTable
        questions={questions}
        searchString={searchString}
        topicIds={topics.map((item) => item.id)}
      />
    </main>
  );
};

export default page;
