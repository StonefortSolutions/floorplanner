import React from "react";
import { useClerk, SignedOut } from "@clerk/clerk-react";
import { DropdownMenuContent, DropdownMenuItem } from "./DropdownMenu";

function SignedOutMenu() {
  const { openSignIn } = useClerk();

  return (
    <SignedOut>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => openSignIn()}>
          <span>Sign In</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </SignedOut>
  );
}

export default SignedOutMenu;
