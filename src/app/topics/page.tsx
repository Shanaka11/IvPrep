import { getAllTopicsAction } from "@/questions/actions/topic/getAllTopicsAction";

import TopicTable from "./(components)/TopicTable";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const topics = await getAllTopicsAction(
    searchParams.search as string | undefined,
  );

  return (
    <main className="flex flex-col gap-2 w-full max-w-screen-2xl px-6 mx-auto mt-4">
      <h1 className="text-2xl font-bold">Topics</h1>
      <TopicTable
        topics={topics}
        searchString={searchParams.search as string | undefined}
      />
    </main>
  );
};

export default page;
