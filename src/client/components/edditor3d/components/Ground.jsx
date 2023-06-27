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
    <mesh ref={mesh} position ={[0,-1.5,0]}name='ground'>
      <boxGeometry args={[size, 4,size]} />
      <meshBasicMaterial color={'#4f4945'} />
      {/* <meshStandardMaterial color={0x77ff00} /> */}
    </mesh>
  );
};

export default Ground;