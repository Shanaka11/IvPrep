"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AppLogo = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return <div></div>;
  }

  return (
    <Link className="text-xl" href="/">
      IvPrep
    </Link>
  );
};

export default AppLogo;
