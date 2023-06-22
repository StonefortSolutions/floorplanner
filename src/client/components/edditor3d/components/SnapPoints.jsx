import { useDispatch, useSelector } from "react-redux";
import { setSelectedPoint } from "../../../store/editor";
import { useState } from "react";
import { addToScene } from "../../../store/scene";
import { v4 as uuidv4 } from "uuid";

/**
 *
 * @param {number} {size}
 * @returns {mesh}
 */
const SnapPoints = ({ size }) => {
  const dispatch = useDispatch();
  const { selectedPoint, selectedModel, currentAction } = useSelector(
    (state) => state.editor
  );
  const midSize = Math.floor(size / 2) - 0.5;

  const snapPoint = (x, y) => {
    const [hovered, setHovered] = useState(false);
    const [selected, setSelected] = useState(false);
    const clickHandler = async (x, y) => {
      dispatch(setSelectedPoint({ x, y }));
      if (
        selectedPoint.x !== null &&
        (x === selectedPoint.x || y === selectedPoint.y)
      ) {
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
      } else if (
        currentAction === "placeItem" &&
        selectedModel !== "" &&
        selectedPoint.x !== null
      ) {
        dispatch(
          addToScene({
            id: uuidv4(),
            itemId: selectedModel,
            transform: { position: selectedPoint },
          })
        );
      } else {
        setSelected(true);
      }
    };

    return (
      <mesh
        position={[x - midSize, 0.1, y - midSize]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={() => clickHandler(x, y)}
        key={`x:${x},y:${y}`}
        onPointerOver={(e) => setHovered(true)}
        onPointerOut={(e) => setHovered(false)}
      >
        <planeGeometry attach="geometry" args={[0.9, 0.9]} />
        <meshBasicMaterial
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

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      output.push(snapPoint(x, y));
    }
  }

  return output;
};

export default SnapPoints;
