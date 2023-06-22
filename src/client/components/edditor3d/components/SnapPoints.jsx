import { useDispatch, useSelector } from "react-redux";
import { setSelectedPoint } from "../../../store/selectedPoint";
import { useThree } from "@react-three/fiber";
import { createWall } from "../modules/createWall";
import { useState } from "react";
import { addToScene } from "../../../store/scene";
import { v4 as uuidv4 } from "uuid";
import store from "../../../store";

const SnapPoints = () => {
  const dispatch = useDispatch();
  const { selectedPoint } = useSelector((state) => state);

  const snapPoint = (x, y) => {
    const [hovered, setHovered] = useState(false);
    const [selected, setSelected] = useState(false);
    const clickHandler = (x, y) => {
      if (
        selectedPoint.x !== null &&
        (x === selectedPoint.x || y === selectedPoint.y)
      ) {
        const currentAction = store.getState().currentAction;
        if (currentAction === "wall") {
          dispatch(
            addToScene({
              id: uuidv4(),
              itemId: "wall",
              transform: { pt1: selectedPoint, pt2: { x, y } },
            })
          );
          dispatch(setSelectedPoint({ x: null, y: null }));
        }
      } else {
        dispatch(setSelectedPoint({ x, y }));
        setSelected(true);
      }
    };

    return (
      <mesh
        position={[x - 24.5, 0.1, y - 24.5]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={() => clickHandler(x, y)}
        key={`x:${x},y:${y}`}
        onPointerOver={(e) => setHovered(true)}
        onPointerOut={(e) => setHovered(false)}
      >
        <planeGeometry attach="geometry" args={[0.9, 0.9]} />
        <meshStandardMaterial
          color={
            selected
              ? "black"
              : hovered
              ? "red"
              : x === selectedPoint.x || y === selectedPoint.y
              ? "blue"
              : 0x5f9111
          }
        />
      </mesh>
    );
  };

  const output = [];

  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
      output.push(snapPoint(x, y));
    }
  }

  return output;
};

export default SnapPoints;
