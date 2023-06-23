import React, { useRef } from "react";
import { DoubleSide } from "three";

/**
 * Creates a ground plane with material
 * @param {number} {size}
 * @returns {mesh}
 */
const Ground = ({ size }) => {
  const mesh = useRef();
  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} name='ground'>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial color={0x00ff00} side={DoubleSide} />
      {/* <meshStandardMaterial color={0x77ff00} /> */}
    </mesh>
  );
};

export default Ground;