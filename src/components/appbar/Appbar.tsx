import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

import { ModeToggle } from "../modeToggle/ModeToggle";
import { Button } from "../ui/button";
import AppLogo from "./AppLogo";
import UserMenu from "./UserMenu";

const Appbar = () => {
  return (
    <div className="flex justify-between items-center px-5">
      <AppLogo />
      <div className="flex gap-2 items-center">
        <Link
          href="/"
          className="group text-primary transition duration-300 hover:-translate-y-0.5"
        >
          Home
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-primary"></span>
        </Link>
        <span className="text-primary text-xl">|</span>
        <Link
          href="/questions/browse"
          className="group text-primary transition duration-300 hover:-translate-y-0.5"
        >
          Explore
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-primary"></span>
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        <SignedOut>
          <SignInButton>
            <Button className="rounded-3xl w-24">Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserMenu />
        </SignedIn>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Appbar;
