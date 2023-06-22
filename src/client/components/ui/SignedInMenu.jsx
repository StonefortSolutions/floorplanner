import React from "react";
import { useClerk, SignedIn, SignOutButton } from "@clerk/clerk-react";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuWithIcon,
  DropdownMenuLabel,
} from "./DropdownMenu";
import { UserIcon, LogOutIcon } from "lucide-react";
import { dark } from "@clerk/themes";

function SignedInMenu() {
  const { openUserProfile, session } = useClerk();
  const isDark = document.documentElement.classList.contains("dark");

  return (
    <SignedIn>
      <DropdownMenuContent>
        <DropdownMenuLabel>Manage Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuWithIcon
            Icon={UserIcon}
            onClick={() =>
              openUserProfile({
                appearance: { baseTheme: isDark ? dark : undefined },
              })
            }
          >
            <span>Profile</span>
          </DropdownMenuWithIcon>
          <SignOutButton signOutOptions={{ sessionId: session?.id }}>
            <DropdownMenuWithIcon Icon={LogOutIcon}>
              <span>Sign Out</span>
            </DropdownMenuWithIcon>
          </SignOutButton>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </SignedIn>
  );
}

export default SignedInMenu;
