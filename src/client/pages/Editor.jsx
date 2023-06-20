import React from "react";
import ApplicationSidebar from "../components/ApplicationSidebar";

function Editor() {
  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <ApplicationSidebar />
        <div className="min-h-full min-w-full bg-green-500"></div>
      </div>
    </div>
  );
}

export default Editor;
