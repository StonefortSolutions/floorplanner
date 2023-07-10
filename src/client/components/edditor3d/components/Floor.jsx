import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromScene } from "../../../store/scene";

function Floor({ point1, point2, id, color }) {
  const currentAction = useSelector((state) => state.currentAction);
  const dispatch = useDispatch();
  const onClick = (e) => {
    if (currentAction === "delete") {
      dispatch(deleteFromScene(id));
    }
  };
  const centerX = ((point1.x + point2.x) / 2) + .5;
  const centerY = ((point1.y + point2.y) / 2) + .5;
  const width = Math.abs(point1.x-point2.x)
  const depth = Math.abs(point1.y-point2.y)
  return (
    <mesh
      position={[centerX, .55, centerY]}
      onClick={onClick}
      rotation={[-Math.PI / 2,0,0]}
      key={id}
    >
      <planeGeometry attach="geometry" args={[width + 1, depth + 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default Floor;