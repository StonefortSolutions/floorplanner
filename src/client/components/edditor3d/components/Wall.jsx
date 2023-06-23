import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromScene } from "../../../store/scene";

function Wall({ point1, point2, id }) {
  const { currentAction, GRID_SIZE } = useSelector((state) => state.editor);
  const dispatch = useDispatch();
  const onClick = (e) => {
    if (currentAction === "delete") {
      dispatch(deleteFromScene(id));
    }
  };
  const midSize = Math.floor(GRID_SIZE / 2) - 0.5;
  const centerX = Math.abs(point1.x + point2.x) / 2 - midSize;
  const centerY = Math.abs(point1.y + point2.y) / 2 - midSize;
  let rotation = 0;
  if (point1.y === point2.y) {
    rotation = Math.PI / 2;
  }
  const depth =
    Math.sqrt(
      Math.abs(
        Math.pow(point2.x - point1.x, 2) - Math.pow(point2.y - point1.y, 2)
      )
    ) + 1;
  return (
    <mesh
      position={[centerX, 4, centerY]}
      rotation={[0, rotation, 0]}
      onClick={onClick}
      key={id}
    >
      <boxGeometry attach="geometry" args={[1, 8, depth]} />
      <meshStandardMaterial color={0x5e461f} />
    </mesh>
  );
}

export default Wall;
