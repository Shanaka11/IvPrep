import { hasPermission } from "@/auth/hasPermission";
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

  if (!hasPermission()) {
    <p>You do not have permission to access this page</p>;
  }

  return (
    <Suspense key={Date.now()} fallback={<TopicTableLoading />}>
      <TopicTableWrapper searchString={decodedSearchParams} />
    </Suspense>
  );
};

export default page;
