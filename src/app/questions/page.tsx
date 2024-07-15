import QuestionTable from "@/questions/components/question/QuestionTable";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // get all questions
  // const topics = await getAllTopicsAction(
  //     searchParams.search
  //       ? decodeURIComponent(searchParams.search as string)
  //       : undefined,
  //   );
  return (
    <main className="flex flex-col gap-2 w-full max-w-screen-2xl px-6 mx-auto mt-4">
      <h1 className="text-2xl font-bold">Questions</h1>
      <QuestionTable />
      {/* <TopicTable
        topics={topics}
        searchString={
          searchParams.search
            ? decodeURIComponent(searchParams.search as string)
            : undefined
        }
      /> */}
    </main>
  );
};

export default page;
