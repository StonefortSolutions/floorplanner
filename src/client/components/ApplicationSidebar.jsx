import React, { useState } from "react";
import { Button } from "./ui/Button";
import {
  PencilIcon,
  ArmchairIcon,
  EraserIcon,
  SaveIcon,
  Rotate3d,
  BoxSelect,
  Building,
  DoorClosed,
} from "lucide-react";
import { cn } from "../utils";
import { Switch } from "./ui/Switch";
import { Label } from "./ui/Label";
import { useDispatch, useSelector } from "react-redux";
import { setAction } from "../store/currentAction";
import { setGridVisible } from "../store/grid";
import { saveFloorplan } from "../store/floorplan";
import NameEditor from "./ui/NameEditor";
import { Skeleton } from "./ui/Skeleton";

export function ApplicationButtons({ className }) {
  const dispatch = useDispatch();
  const { singleFloorplan, pendingSave, isLoaded } = useSelector(
    (state) => state.floorplan
  );
  const currentAction = useSelector((state) => state.currentAction);
  return isLoaded ? (
    <>
      <Button
        variant={currentAction === "orbit" ? "secondary" : "ghost"}
        size="sm"
        className={
          currentAction === "orbit"
            ? "w-full justify-start bg-gradient-to-br from-red-600 to-orange-500"
            : "w-full justify-start hover:scale-105"
        }
        onClick={() => dispatch(setAction("orbit"))}
      >
        <Rotate3d className="mr-2 h-4 w-4" />
        Orbit
      </Button>
      <Button
        variant={currentAction === "room" ? "secondary" : "ghost"}
        size="sm"
        className={
          currentAction === "room"
            ? "w-full justify-start bg-gradient-to-br from-red-600 to-orange-500"
            : "w-full justify-start hover:scale-105"
        }
        onClick={() => dispatch(setAction("room"))}
      >
        <Building className="mr-2 h-4 w-4" />
        Room
      </Button>
      <Button
        variant={currentAction === "wall" ? "secondary" : "ghost"}
        size="sm"
        className={
          currentAction === "wall"
            ? "w-full justify-start bg-gradient-to-br from-red-600 to-orange-500"
            : "w-full justify-start hover:scale-105"
        }
        onClick={() => dispatch(setAction("wall"))}
      >
        <PencilIcon className="mr-2 h-4 w-4" />
        Walls
      </Button>
      <Button
        variant={currentAction === "floor" ? "secondary" : "ghost"}
        size="sm"
        className={
          currentAction === "floor"
            ? "w-full justify-start bg-gradient-to-br from-red-600 to-orange-500"
            : "w-full justify-start hover:scale-105"
        }
        onClick={() => dispatch(setAction("floor"))}
      >
        <BoxSelect className="mr-2 h-4 w-4" />
        Floor
      </Button>
      <Button
        variant={currentAction === "delete" ? "secondary" : "ghost"}
        size="sm"
        className={
          currentAction === "delete"
            ? "w-full justify-start bg-gradient-to-br from-red-600 to-orange-500"
            : "w-full justify-start hover:scale-105"
        }
        onClick={() => dispatch(setAction("delete"))}
      >
        <EraserIcon className="mr-2 h-4 w-4" />
        Eraser
      </Button>
      {/* <Button
        variant={currentAction === "edit" ? "secondary" : "ghost"}
        size="sm"
        className={currentAction === "edit" ? "w-full justify-start bg-gradient-to-br from-red-600 to-orange-500" : "w-full justify-start hover:scale-105"}
        onClick={() => dispatch(setAction("edit"))}
      >
        <EraserIcon className="mr-2 h-4 w-4" />
        Edit !!! In Progress !!!
      </Button> */}
      <Button
        variant={currentAction === "placeItem" ? "secondary" : "ghost"}
        size="sm"
        className={
          currentAction === "placeItem"
            ? "w-full justify-start bg-gradient-to-br from-red-600 to-orange-500"
            : "w-full justify-start hover:scale-105"
        }
        onClick={() => dispatch(setAction("placeItem"))}
      >
        <ArmchairIcon className="mr-2 h-4 w-4" />
        Furniture
      </Button>
      <Button
        variant={currentAction === "door" ? "secondary" : "ghost"}
        size="sm"
        className={
          currentAction === "door"
            ? "w-full justify-start bg-gradient-to-br from-red-600 to-orange-500"
            : "w-full justify-start hover:scale-105"
        }
        onClick={() => dispatch(setAction("door"))}
      >
        <DoorClosed className="mr-2 h-4 w-4" />
        Door
      </Button>
      {/* <Button
        variant={currentAction === "firstPerson" ? "secondary" : "ghost"}
        size="sm"
        className={currentAction === "firstPerson" ? "w-full justify-start bg-gradient-to-br from-red-600 to-orange-500" : "w-full justify-start hover:scale-105"}
        onClick={() => dispatch(setAction("firstPerson"))}
      >
        <DoorClosed className="mr-2 h-4 w-4" />
        First Person !Dont click!
      </Button> */}
      <Button
        onClick={() => dispatch(saveFloorplan(singleFloorplan))}
        variant="ghost"
        size="sm"
        className="w-full justify-start hover:scale-105 relative"
      >
        <SaveIcon className="mr-2 h-4 w-4" />
        Save
        {pendingSave && (
          <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full top-0 -left-0.5 dark:border-gray-900" />
        )}
      </Button>
    </>
  ) : (
    <Skeleton className="p-4 h-full w-full rounded-lg" />
  );
}

function ApplicationSidebar({ className }) {
  const dispatch = useDispatch();
  const { GRID_SIZE, GRID_VISIBLE } = useSelector((state) => state.grid);
  const { isLoaded } = useSelector((state) => state.floorplan);

  return isLoaded ? (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <NameEditor />
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Create
          </h2>
          <div className="space-y-1">
            <ApplicationButtons />
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
  ) : (
    <Skeleton className="p-4 h-full w-full rounded-lg" />
  );
}

export default ApplicationSidebar;
