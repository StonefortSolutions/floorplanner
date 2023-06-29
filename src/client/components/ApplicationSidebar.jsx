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
  Briefcase,
  Edit,
  Save,
  X,
  XSquare,
  DoorClosed,
} from "lucide-react";
import { cn } from "../utils";
import { Switch } from "./ui/Switch";
import { Label } from "./ui/Label";
import { saveScene } from "../store/scene";
import { useDispatch, useSelector } from "react-redux";
import { setAction } from "../store/currentAction";
import { setGridVisible } from "../store/grid";
import { useSaveSceneAtInterval } from "../hooks/useSaveScene";
import { useNavigate } from 'react-router-dom'

export function ApplicationButtons({ className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scene = useSelector((state) => state.scene);
  const currentAction = useSelector((state) => state.currentAction);
  return (
    <>
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
        variant={currentAction === "door" ? "secondary" : "ghost"}
        size="sm"
        className="w-full justify-start"
        onClick={() => dispatch(setAction("door"))}
      >
        <DoorClosed className="mr-2 h-4 w-4" />
        Door
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
      <Button
        onClick={()=>{navigate('/dashboard')}}
        variant="ghost"
        size="sm"
        className="w-full justify-start"
      >
        <Briefcase className="mr-2 h-4 w-4"/>
        Exit
      </Button>
    </>
  );
}

function ToolTips(){
  const currentAction = useSelector(state => state.currentAction)
  const wallFloorRoom = (
    <p>
      Click and Drag to add to Scene
    </p>
  )
  const orbit = (
    <>
      <p>Scroll to zoom</p>
      <p>Middle mouse to rotate</p>
      <p>Right mouse to pan</p>
    </>
  )
  const furniture = (
    <p>Click to place item</p>
  )
  const erase = (
    <p>click on an item to delete it</p>
  )
  const door = (
    <>
      <p>Select a Door</p>
      <p>Click on a wall to add a door</p>
    </>
  )

  return (
    <div>
      <h1>Help</h1>
      {
        currentAction === 'wall' || currentAction === 'floor' || currentAction === 'room'
        ? wallFloorRoom 
        : currentAction === 'orbit'
        ? orbit
        : currentAction === 'placeItem'
        ? furniture
        : currentAction === 'delete'
        ? erase
        : null
      }
    </div>
  )
}

function ApplicationSidebar({ className }) {
  const dispatch = useDispatch();
  const { GRID_SIZE, GRID_VISIBLE } = useSelector((state) => state.grid);
  const { isSaving } = useSaveSceneAtInterval(10000);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("Floorplan Name");

  const handleSave = () => {
    console.log("saved");
    setEdit(false);
  };

  const handleCancel = () => {
    console.log("cancelled");
    setEdit(false);
  };

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            <div>
              {edit ? <input placeholder={name}></input> : <h3>{name}</h3>}
              {!edit && (
                <Button onClick={() => setEdit(!edit)}>
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              {edit && (
                <div>
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button onClick={handleCancel}>
                    <XSquare className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </h2>
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
              <span className="block px-4 py-2">
                <div className="flex items-center space-x-2">
                  {isSaving && (
                    <SaveIcon className="mr-2 h-4 w-4 animate-pulse" />
                  )}
                </div>
              </span>
            </div>
          </div>
        </div>
        <ToolTips/>
      </div>
    </div>
  );
}

export default ApplicationSidebar;
