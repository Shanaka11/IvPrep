import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex flex-col gap-2 w-full max-w-screen-2xl px-6 mx-auto mt-4 container pb-6">
      {children}
    </main>
  );
};

export default layout;
