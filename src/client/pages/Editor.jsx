import React from "react";
import ApplicationSidebar from "../components/ApplicationSidebar";
import Edditor3d from "../components/edditor3d/main";
import { useDispatch, useSelector } from "react-redux"
import { loadScene } from "../store/scene";

function Editor() {
  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <ApplicationSidebar className="border-r" />
        <div className="min-w-[400px] min-h-[400px] flex-1 bg-green-500">
        <Edditor3d />
        </div>
      </div>
    </div>
  );
}

export default Editor;
