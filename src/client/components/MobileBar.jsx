import React from "react";
import { ApplicationButtons } from "./ApplicationSidebar";

function MobileBar() {
  return (
    <div className="fixed bottom-0 left-0 z-50 h-16 w-full border-t bg-accent md:hidden">
      <div className="mx-auto grid h-full max-w-lg grid-cols-5 font-medium">
        <ApplicationButtons />
      </div>
    </div>
  );
}

export default MobileBar;
