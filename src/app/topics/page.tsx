import { getAllTopicsAction } from "@/questions/actions/topic/getAllTopicsAction";
import React from "react";

import TopicTable from "./(components)/TopicTable";

const page = async () => {
  return (
    <main className="flex flex-col gap-2 w-full max-w-screen-2xl px-6 mx-auto mt-4">
      <h1 className="text-2xl font-bold">Topics</h1>
      <TopicTable />
    </main>
  );
};

export default page;
