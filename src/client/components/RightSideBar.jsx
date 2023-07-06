import { useSelector } from "react-redux";
import ColorPicker from "./ColorPicker";
import ModelSelector from "./ModelSelector";
import ToolTips from "./ToolTips";

const RightSideBar = () => {
  const currentAction = useSelector((state) => state.currentAction);
  return (
    <div className="md:w-1/5 2xl:w-2/6 max-h-[87vh] mx-4 max-w-md">
      <ToolTips/>
      {(currentAction === "placeItem" ||
        currentAction === "door") && <ModelSelector />}
      {(currentAction === "wall" ||
        currentAction === "room" ||
        currentAction === "floor") && <ColorPicker />}
    </div>
  );
};



export default RightSideBar;
