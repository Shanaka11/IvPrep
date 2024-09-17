"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import Logo from "../logo/Logo";

const AppLogo = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return <div></div>;
  }

  return (
    <Link className="text-xl h-full p-2" href="/">
      <Logo />
    </Link>
  );
};

export default AppLogo;
