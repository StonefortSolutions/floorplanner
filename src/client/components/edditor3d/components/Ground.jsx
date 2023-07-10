import React, { useRef } from "react";
import * as THREE from "three";
import { useLoader } from '@react-three/fiber';

/**
 * Creates a ground plane with material
 * @param {number} {size}
 * @returns {mesh}
 */
const Ground = ({ size }) => {
  const mesh = useRef();
  const normals = useLoader(THREE.TextureLoader, "/normals/groundNormal.png");
  normals.wrapS = THREE.RepeatWrapping
  normals.wrapT = THREE.RepeatWrapping
  normals.repeat.set(8,8)
  return (
    <mesh ref={mesh} position ={[0,-1.5,0]}name='ground'>
      <boxGeometry args={[size, 4,size]} />
      <meshStandardMaterial color={'#4f4945'} normalMap={normals}/>
      {/* <meshStandardMaterial color={0x77ff00} /> */}
    </mesh>
  );
};

export default Ground;