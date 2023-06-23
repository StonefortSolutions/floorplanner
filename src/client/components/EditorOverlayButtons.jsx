import React, { useEffect } from "react";
import { Button } from "./ui/Button";
import { GlobeIcon, GridIcon, RedoIcon, UndoIcon } from "lucide-react";
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

function EditorOverlayButtons({ is2D, setIs2D }) {
  const dispatch = useDispatch();
  const [canUndo, setCanUndo] = useState(false);
  const { undoItems, redoItems } = useSelector((state) => state.itemHistory);
  const scene = useSelector((state) => state.scene);

  //this needs to be refactored
  useEffect(() => {
    if (scene.length > 0) {
      if (!canUndo) {
        setCanUndo(true);
      }
    }
  }, [scene]);

  if (!scene) return null;

  const handleUndo = () => {
    if (scene.length > 0) {
      dispatch(addRedoItem(scene[scene.length - 1]));
      dispatch(undoLastAction());
      if (scene.length === 0) {
        setCanUndo(false);
      }
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
      <div className="absolute bottom-0 right-0 m-4 p-2">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-1">
            {canUndo && (
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
            )}
            {redoItems.length > 0 && (
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
            )}
          </div>
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
        </div>
      </div>
    </TooltipProvider>
  );
}

export default EditorOverlayButtons;
