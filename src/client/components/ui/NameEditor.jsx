import React from "react";
import { Button } from "./Button";
import { Edit, Save, XSquare } from "lucide-react";

const NameEditor = () => {
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
    <div>
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
    </div>
  );
};

export default NameEditor;
