import React from "react";
import { useClerk, SignedIn, SignOutButton } from "@clerk/clerk-react";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuWithIcon,
  DropdownMenuLabel,
} from "./DropdownMenu";
import { UserIcon, LogOutIcon, LockIcon } from "lucide-react";
import { dark } from "@clerk/themes";
import { useNavigate } from "react-router-dom";

function SignedInMenu() {
  const { openUserProfile, session, user } = useClerk();
  const isUserAdmin = user?.publicMetadata?.isAdmin;
  const navigate = useNavigate();
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
          {isUserAdmin && (
            <DropdownMenuWithIcon
              Icon={LockIcon}
              onClick={() => navigate("/admin")}
            >
              <span>Admin</span>
            </DropdownMenuWithIcon>
          )}
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
