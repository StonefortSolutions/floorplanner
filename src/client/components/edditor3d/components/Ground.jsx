import React, { useRef } from 'react';

const Ground = (props) => {
  const mesh = useRef();
  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args = {[50,50]} />
      <meshStandardMaterial color = {0x77ff00}/>
    </mesh>
  );
}

export default Ground