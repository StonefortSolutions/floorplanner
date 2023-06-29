import { useSelector } from "react-redux";
import ColorPicker from "./ColorPicker";
import ModelSelector from "./ModelSelector";

const RightSideBar = () => {
  const currentAction = useSelector((state) => state.currentAction);
  return (
    <div className="w-1/5 max-h-[87vh]">
      {(currentAction === "placeItem" ||
        currentAction === "door") && <ModelSelector />}
      {(currentAction === "wall" ||
        currentAction === "room" ||
        currentAction === "floor") && <ColorPicker />}
    </div>
  );
};

export default RightSideBar;
