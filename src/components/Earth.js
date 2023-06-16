import React, { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import texture from '../assets/texture3D/4_no_ice_clouds_mts_8k.jpg';
function Earth() {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  const textureMap = useLoader(TextureLoader, texture);
  return (
    <mesh ref={mesh}>
      <sphereBufferGeometry attach='geometry' args={[2, 32]} />
      <meshStandardMaterial map={textureMap} />
    </mesh>
  );
}
export default Earth;
