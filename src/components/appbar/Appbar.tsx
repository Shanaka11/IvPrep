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
      <div className="flex gap-2">
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
