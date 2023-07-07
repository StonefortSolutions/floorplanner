import React, { useEffect } from "react";
import { Button } from "./ui/Button";
import {
  GlobeIcon,
  GridIcon,
  RedoIcon,
  UndoIcon,
  RefreshCw,
} from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./ui/Tooltip";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToScene, undoLastAction } from "../store/scene";
import {
  addRedoItem,
  addUndoItem,
  removeLastRedoItem,
} from "../store/itemHistory";
import { rotate } from "../store/rotation";

function EditorOverlayButtons({ is2D, setIs2D }) {
  const dispatch = useDispatch();
  const { undoItems, redoItems } = useSelector((state) => state.itemHistory);
  const currentAction = useSelector((state) => state.currentAction);
  const scene = useSelector((state) => state.scene);

  //todo refactor for only undo items after load, not entire scene
  if (!scene) return null;

  const handleUndo = () => {
    if (scene.length > 0) {
      dispatch(addRedoItem(scene[scene.length - 1]));
      dispatch(undoLastAction());
    }
  };

  const handleRedo = () => {
    if (redoItems.length > 0) {
      dispatch(addToScene(redoItems[redoItems.length - 1]));
      dispatch(removeLastRedoItem());
    }
  };

  return (
    <TooltipProvider>
      <div className="absolute bottom-1 left-1 :m-4 p-2">
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          {scene.length > 0 ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className=""
                  onClick={() => handleUndo()}
                >
                  <UndoIcon size={24} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Undo last action</p>
              </TooltipContent>
            </Tooltip>
          ) : null}
          {redoItems.length > 0 ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className=""
                  onClick={() => handleRedo()}
                >
                  <RedoIcon size={24} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Redo last action</p>
              </TooltipContent>
            </Tooltip>
          ) : null}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className=""
                onClick={() => setIs2D(!is2D)}
              >
                {is2D ? <GlobeIcon size={24} /> : <GridIcon size={24} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {is2D ? "View 3D Perspective" : "View Top Down Perspective"}
              </p>
            </TooltipContent>
          </Tooltip>
          {currentAction === "door" || currentAction === "placeItem" ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className=""
                  onClick={() => dispatch(rotate(Math.PI / 2))}
                >
                  <RefreshCw size={24} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Rotate 90 Degrees</p>
              </TooltipContent>
            </Tooltip>
          ) : null}
        </div>
      </div>
    </TooltipProvider>
  );
}

export default EditorOverlayButtons;
