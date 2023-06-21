import React from "react";
import { Button } from "./ui/Button";
import {
  PlayCircleIcon,
  PencilIcon,
  ArmchairIcon,
  EraserIcon,
} from "lucide-react";
import { cn } from "../utils";
import { Switch } from "./ui/Switch";
import { Label } from "./ui/Label";
import { saveScene } from "../store/scene";
import { useDispatch, useSelector } from "react-redux"
import { setAction } from "../store/currentAction";

function ApplicationSidebar({ className }) {
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Create
          </h2>
          <div className="space-y-1">
            <Button
              variant="secondary"
              size="sm"
              className="w-full justify-start"
              onClick={()=>dispatch(setAction('wall'))}
            >
              <PencilIcon className="mr-2 h-4 w-4" />
              Walls
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start"
              onClick={()=>dispatch(setAction('delete'))}
            >
              <EraserIcon className="mr-2 h-4 w-4" />
              Eraser
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <ArmchairIcon className="mr-2 h-4 w-4" />
              Furniture
            </Button>
            <Button onClick={()=>dispatch(saveScene(state.scene))} variant="ghost" size="sm" className="w-full justify-start">
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
                Length: <span className="font-semibold">10m</span>
              </span>
              <span className="block px-4 py-2">
                Height: <span className="font-semibold">10m</span>
              </span>
              <span className="block px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Switch id="show-grid" />
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
