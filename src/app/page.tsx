import QuestionGenerator from "@/questions/components/question/QuestionGenerator";

export default async function Home() {
  // This is the home page, when a quiz is not generated
  return (
    <main>
      {/* Select Topics Component */}
      <div className="grid h-96 place-items-center ">
        <QuestionGenerator />
      </div>
    </main>
  );
}
