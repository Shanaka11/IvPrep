import { hasPermission } from "@/auth/hasPermission";
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

  if (!hasPermission()) {
    <p>You do not have permission to access this page</p>;
  }

  return (
    <Suspense key={Date.now()} fallback={<QuestionTableLoading />}>
      <QuestionTableWrapper searchString={searchString} topics={topics} />
    </Suspense>
  );
};

export default page;
