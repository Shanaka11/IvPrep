import Quiz from "@/questions/components/question/Quiz";
import { parseTopics } from "@/util/parseTopics";
import { Suspense } from "react";

import LoadingSkeleton from "./(components)/LoadingSkeleton";

const page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const topics = parseTopics(searchParams.topic);

  return (
    <Suspense key={Date.now()} fallback={<LoadingSkeleton />}>
      <Quiz topics={topics} />
    </Suspense>
  );
};

export default page;
