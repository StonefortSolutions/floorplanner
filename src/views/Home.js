import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import Earth from "../components/Earth";

const Home = () => (
  <>
    <div className=''>3d graphics demo</div>
    <div className='canvas1'>
      <Canvas>
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2, 10, 2]} intensity={1} />
        <Earth />
      </Canvas>
    </div>
  </>
);

export default Home;
