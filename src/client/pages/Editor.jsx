import React from "react";
import ApplicationSidebar from "../components/ApplicationSidebar";

function Editor() {
  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <ApplicationSidebar className="border-r" />
        <div className="min-w-[400px] min-h-[400px] flex-1 bg-green-500"></div>
      </div>
    </div>
  );
}

export default Editor;
