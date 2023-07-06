import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { Edit, Save, XSquare } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleFloorplan,
  updateFloorplanName,
} from "../../store/floorplan";
import { useParams } from "react-router-dom";

const NameEditor = () => {
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const singleFloorplan = useSelector(
    (state) => state.floorplan.singleFloorplan
  ) || { name: "Loading" };

  useEffect(() => {
    dispatch(fetchSingleFloorplan(id));
  }, []);

  const handleSave = () => {
    dispatch(updateFloorplanName({ input, id }));
    setEdit(false);
  };

  const handleCancel = () => {
    setEdit(false);
  };

  return (
    <div>
      <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
        <div>
          {edit ? (
            <input
              placeholder={singleFloorplan.name}
              onChange={(event) => setInput(event.target.value)}
            ></input>
          ) : (
            <h3>{singleFloorplan.name}</h3>
          )}
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
    </div>
  );
};

export default NameEditor;
