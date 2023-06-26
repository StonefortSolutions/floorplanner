import { SketchPicker } from "react-color";
import { useState } from "react";
import { Button } from "./ui/Button";
import {useDispatch} from 'react-redux';
import {setColor} from '../store/selectedColor'

function ColorPicker() {
  const [color, setPickerColor] = useState("#37d67a");
  const dispatch = useDispatch()
  return (
    <div className="lg:w-[500px] lg:h-[700px]">
      <h6>Color Picker</h6>
      <SketchPicker
        color={color}
        onChange={(color) => {
          setPickerColor(color.hex);
        }}
      />
      <Button
        onClick={()=>dispatch(setColor(color))}
      >
        Select
      </Button>
    </div>
  );
}

export default ColorPicker;