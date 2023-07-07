import { CustomPicker, CirclePicker, SliderPicker } from "react-color";
import { useState } from "react";
import { Button } from "./ui/Button";
import { useDispatch } from "react-redux";
import { setColor } from "../store/selectedColor";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/DropdownMenu";

function ColorPicker() {
  const [color, setPickerColor] = useState("#5e461f");
  const dispatch = useDispatch();
  const handleChange = (color) => {
    setPickerColor(color.hex);
    dispatch(setColor(color.hex));
  };

  return (
    <div className="m-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <p className="mr-1">Color: </p>
            <div
              className="w-6 h-6 rounded-full border border-black"
              style={{ backgroundColor: color }}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="p-2">
            <div className="mt-2 mb-2" />
            <CirclePicker color={color} onChange={handleChange} />
            <div className="mt-2 mb-2" />
            <SliderPicker color={color} onChange={handleChange} />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default CustomPicker(ColorPicker);
