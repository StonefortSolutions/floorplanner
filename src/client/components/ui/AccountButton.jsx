import React from "react";
import { ClerkLoading, ClerkLoaded } from "@clerk/clerk-react";
import { DropdownMenu, DropdownMenuTrigger } from "./DropdownMenu";
import { Button } from "./Button";
import { Loader2, LayoutPanelLeftIcon } from "lucide-react";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";
function AccountButton() {
  return (
    <div className="container">
      <ClerkLoading>
        <Loader2 className="animate-spin h-10 w-10 dark:text-slate-200" />
      </ClerkLoading>
      <ClerkLoaded>
        <div className="flex flex-row gap-6">
          <a href="/dashboard">
            <Button
              variant="default"
              className="font-bold w-24 h-10 hover:bg-gradient-to-tr hover:from-orange-400 hover:to-pink-500 hover:scale-110"
            >
              <div className="flex flex-row items-center">
                <LayoutPanelLeftIcon size={24} className="text-black pr-1" />
                <span>Dashboard</span>
              </div>
            </Button>
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Account</Button>
            </DropdownMenuTrigger>
            <SignedInMenu />
            <SignedOutMenu />
          </DropdownMenu>
        </div>
      </ClerkLoaded>
    </div>
  );
}

export default AccountButton;
