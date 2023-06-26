import React from "react";
import { Button } from "./ui/Button";
import { PencilIcon, ArmchairIcon, EraserIcon, SaveIcon, Rotate3d, BoxSelect, Building } from "lucide-react";
import { cn } from "../utils";
import { Switch } from "./ui/Switch";
import { Label } from "./ui/Label";
import { saveScene } from "../store/scene";
import { useDispatch, useSelector } from "react-redux";
import { setAction } from "../store/currentAction";
import { setGridVisible } from "../store/grid";

function ApplicationSidebar({ className }) {
  const dispatch = useDispatch();
  const scene = useSelector((state) => state.scene);
  const currentAction = useSelector((state) => state.currentAction);
  const { GRID_SIZE, GRID_VISIBLE } = useSelector((state) => state.grid);

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Create
          </h2>
          <div className="space-y-1">
            <Button
              variant={currentAction === "orbit" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => dispatch(setAction("orbit"))}
            >
              <Rotate3d className="mr-2 h-4 w-4" />
              Orbit
            </Button>
            <Button
              variant={currentAction === "room" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => dispatch(setAction("room"))}
            >
              <Building className="mr-2 h-4 w-4" />
              Room
            </Button>
            <Button
              variant={currentAction === "wall" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => dispatch(setAction("wall"))}
            >
              <PencilIcon className="mr-2 h-4 w-4" />
              Walls
            </Button>
            <Button
              variant={currentAction === "floor" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => dispatch(setAction("floor"))}
            >
              <BoxSelect className="mr-2 h-4 w-4" />
              Floor
            </Button>
            <Button
              variant={currentAction === "delete" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => dispatch(setAction("delete"))}
            >
              <EraserIcon className="mr-2 h-4 w-4" />
              Eraser
            </Button>
            <Button
              variant={currentAction === "placeItem" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => dispatch(setAction("placeItem"))}
            >
              <ArmchairIcon className="mr-2 h-4 w-4" />
              Furniture
            </Button>
            <Button
              onClick={() => dispatch(saveScene(scene))}
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              <SaveIcon className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
        <div className="py-2">
          <h2 className="relative px-6 text-lg font-semibold tracking-tight">
            Tool Info:
          </h2>
          <div className="px-4 py-2">
            <div className="space-y-1">
              <span className="block px-4 py-2">
                Length: <span className="font-semibold">{GRID_SIZE} units</span>
              </span>
              <span className="block px-4 py-2">
                Height: <span className="font-semibold">{GRID_SIZE} units</span>
              </span>
              <span className="block px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-grid"
                    checked={GRID_VISIBLE}
                    onClick={() => dispatch(setGridVisible(!GRID_VISIBLE))}
                  />
                  <Label htmlFor="show-grid">Show Grid</Label>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationSidebar;
