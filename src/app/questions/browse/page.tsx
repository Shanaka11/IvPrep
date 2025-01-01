import { Separator } from "@/components/ui/separator";
import QuestionList from "@/questions/components/question/QuestionList";
import QuestionTableSearch from "@/questions/components/question/QuestionTableSearch";
import { parseTopics } from "@/util/parseTopics";
import React from "react";

const page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const searchString = searchParams.search
    ? (searchParams.search as string)
    : null;
  const topics = parseTopics(searchParams.topic).map((item) => item.id);

  return (
    <>
      <h1 className="text-2xl font-bold">Questions</h1>
      <Separator className="my-2 bg-transparent bg-gradient-to-r from-transparent via-primary" />
      <div className="flex flex-col gap-2">
        <QuestionTableSearch searchString={searchString} topicIds={topics} />
        {(searchString != null || topics.length > 0) && (
          <QuestionList searchString={searchString} topics={topics} />
        )}
      </div>
    </>
  );
};

export default page;
