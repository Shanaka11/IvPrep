import { Separator } from "@/components/ui/separator";
import QuestionTableWrapper from "@/questions/components/question/QuestionTableWrapper";
import { parseTopics } from "@/util/parseTopics";
import { Suspense } from "react";

import QuestionTableLoading from "./(components)/QuestionTableLoading";

const page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const searchString = searchParams.search
    ? (searchParams.search as string)
    : null;
  const topics = parseTopics(searchParams.topic);

  return (
    <>
      <h1 className="text-2xl font-bold">Questions</h1>
      <Separator className="my-2 bg-transparent bg-gradient-to-r from-transparent via-primary" />
      <Suspense key={Date.now()} fallback={<QuestionTableLoading />}>
        <QuestionTableWrapper searchString={searchString} topics={topics} />
      </Suspense>
    </>
  );
};

export default page;
