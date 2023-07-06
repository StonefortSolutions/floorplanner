import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { Edit, Save, XSquare } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateFloorplanData, saveFloorplan } from "../../store/floorplan";
import { Input } from "./Input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./Tooltip";

const NameEditor = () => {
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const singleFloorplan = useSelector(
    (state) => state.floorplan.singleFloorplan
  );

  const handleSave = (id) => {
    dispatch(updateFloorplanData({ name: input }));
    setEdit(false);
  };

  useEffect(() => {
    if (edit === false) {
      dispatch(saveFloorplan(singleFloorplan));
    }
  }, [edit]);

  const handleCancel = () => {
    setEdit(false);
  };

  return (
    <TooltipProvider>
      <div>
        <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
          <div className="flex w-full max-w-sm items-center space-x-2">
            {edit ? (
              <Input
                placeholder={singleFloorplan.name}
                onChange={(event) => setInput(event.target.value)}
              />
            ) : (
              <h3>{singleFloorplan.name}</h3>
            )}
            {!edit && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEdit(!edit)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit</p>
                </TooltipContent>
              </Tooltip>
            )}
            {edit && (
              <div className="">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSave(singleFloorplan.id)}
                      disabled={input.length < 1}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Save</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={handleCancel}>
                      <XSquare className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent sideOffest={-10}>
                    <p>Cancel</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>
        </h2>
      </div>
    </TooltipProvider>
  );
};

export default NameEditor;
