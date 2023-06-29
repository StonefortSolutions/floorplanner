import React from "react";
import ApplicationSidebar from "../components/ApplicationSidebar";
import Editor3d from "../components/edditor3d/main";
import RightSideBar from "../components/RightSideBar";
import MobileBar from "../components/MobileBar";

function Editor() {
  return (
    <div className="flex flex-col md:flex-row p-2 w-full h-[87vh] overflow-hidden">
      <ApplicationSidebar className="border-r md:block w-1/5 hidden" />
      <div className="min-w-[200px] min-h-[200px] flex-1 bg-secondary border p-2">
        <Editor3d />
      </div>
      <RightSideBar className="hidden md:block  md:w-1/5" />
      <MobileBar className="md:hidden block" />
    </div>
  );
}

export default Editor;
