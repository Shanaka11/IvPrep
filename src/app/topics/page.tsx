import TopicTableWrapper from "@/questions/components/topic/TopicTableWrapper";
import { Suspense } from "react";

import TopicTableLoading from "./(components)/TopicTableLoading";

const page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const decodedSearchParams = searchParams.search
    ? decodeURIComponent(searchParams.search as string)
    : null;

  return (
    <Suspense key={Date.now()} fallback={<TopicTableLoading />}>
      <TopicTableWrapper searchString={decodedSearchParams} />;
    </Suspense>
  );
};

export default page;
