import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

import { ModeToggle } from "../modeToggle/ModeToggle";
import { Button } from "../ui/button";
import UserMenu from "./UserMenu";

const Appbar = () => {
  return (
    <div className="flex justify-between items-center px-4">
      <Link className="text-xl" href="/">
        IvPrep
      </Link>
      <div className="flex gap-2">
        <ModeToggle />
        <SignedOut>
          <SignInButton>
            <Button className="rounded-3xl w-24">Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserMenu />
        </SignedIn>
      </div>
    </div>
  );
};

export default Appbar;
