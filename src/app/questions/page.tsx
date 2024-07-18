import { getUserQuestionsAction } from "@/questions/actions/question/getUserQuestionsAction";
import QuestionTable from "@/questions/components/question/QuestionTable";

const parseTopics = (topics: string | string[] | undefined) => {
  if (topics === undefined) return [];
  if (Array.isArray(topics))
    return topics.map((item) => parseInt(decodeURIComponent(item)));
  return [parseInt(topics)];
};

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
    topicIds: topics.length > 0 ? topics : null,
  });

  return (
    <main className="flex flex-col gap-2 w-full max-w-screen-2xl px-6 mx-auto mt-4">
      <h1 className="text-2xl font-bold">Questions</h1>
      <QuestionTable
        questions={questions}
        searchString={searchString}
        topicIds={topics}
      />
    </main>
  );
};

export default page;
