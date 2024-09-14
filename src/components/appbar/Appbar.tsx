import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

import { Button } from "../ui/button";
import UserMenu from "./UserMenu";

const Appbar = () => {
  return (
    <div className="flex justify-between items-center px-4">
      <Link className="text-xl" href="/">
        IvPrep
      </Link>
      <SignedOut>
        <SignInButton>
          <Button className="rounded-3xl w-24">Sign In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserMenu />
      </SignedIn>
    </div>
  );
};

export default Appbar;
