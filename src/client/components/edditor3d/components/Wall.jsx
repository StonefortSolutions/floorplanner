import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromScene } from "../../../store/scene";

function Wall({ point1, point2, id, color, height, bottom }) {
  const currentAction = useSelector((state) => state.currentAction);
  const dispatch = useDispatch();
  const onClick = (e) => {
    if (currentAction === "delete") {
      dispatch(deleteFromScene(id));
    }
  };
  const centerX = ((point1.x + point2.x) / 2) + .5;
  const centerY = ((point1.y + point2.y) / 2) + .5;
  let rotation = 0;
  if (point1.y === point2.y) {
    rotation = Math.PI / 2;
  }
  const depth =
    Math.sqrt(
      Math.abs(
        Math.pow(point2.x - point1.x, 2) - Math.pow(point2.y - point1.y, 2)
      )
    ) + .5;
  return (
    <mesh
      position={[centerX, (height / 2) + bottom + .5, centerY]}
      rotation={[0, rotation, 0]}
      onClick={onClick}
      userData={{id}}
      name="wall"
    >
      <boxGeometry attach="geometry" args={[.5, height, depth]} />
      <meshStandardMaterial color={color}/>
    </mesh>
  );
}

export default Wall;
