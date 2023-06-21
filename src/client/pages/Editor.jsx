import React from "react";
import ApplicationSidebar from "../components/ApplicationSidebar";
import Editor3d from "../components/edditor3d/main";
import { useDispatch, useSelector } from "react-redux";
import { loadScene } from "../store/scene";

function Editor() {
  return (
    <div className="flex flex-col lg:flex-row p-2 h-full w-full">
      <ApplicationSidebar className="border-r flex" />
      <div className="min-w-[400px] min-h-[400px] flex-1 bg-secondary border p-2">
        <Editor3d />
      </div>
    </div>
  );
}

export default Editor;
