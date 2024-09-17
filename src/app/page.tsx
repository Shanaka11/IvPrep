import Logo from "@/components/logo/Logo";
import QuestionGenerator from "@/questions/components/question/QuestionGenerator";

export default async function Home() {
  // This is the home page, when a quiz is not generated
  return (
    <main>
      {/* Select Topics Component */}
      <div className="grid h-full place-items-center px-5">
        <div className="flex flex-col gap-5 max-w-[700px] w-full items-center -translate-y-20 xs:transform-none">
          <div className="max-w-[300px] w-full">
            <Logo />
          </div>
          <QuestionGenerator />
        </div>
      </div>
    </main>
  );
}
