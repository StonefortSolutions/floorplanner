import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromScene } from "../../../store/scene";
import * as THREE from "three";
import { useTexture } from '@react-three/drei';

function Floor({ point1, point2, id, color }) {
  const normals = useTexture("/normals/floorNormal.jpg");
  console.log(normals);
  normals.repeat.set(Math.floor(Math.abs(point1.x - point2.x) / 4), Math.floor(Math.abs(point1.y - point2.y) / 4))
  normals.wrapS = normals.wrapT = THREE.RepeatWrapping  
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
      <meshStandardMaterial color={color} normalMap={normals} />
    </mesh>
  );
}

export default Floor;