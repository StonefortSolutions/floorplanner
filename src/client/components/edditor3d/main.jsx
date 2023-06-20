import React, {useState, useRef} from 'react'
import { Canvas } from '@react-three/fiber';
import { DragControls } from './modules/dragControls';
import { OrbitControls } from '@react-three/drei';
import Ground from './components/Ground'
import Grid from './components/Grid';
import SnapPoints from './components/SnapPoints';

const Edditor3d = () => {
  const [is2D, setIs2D] = useState(true)
  //const [selectedPoint, setSelectedPoint] =
  return (
    <div id="edditor" className='w-[1000px] h-[600px]'>
      <Canvas id="canvas1"camera={{position: [0,20, 20]}}>
        <OrbitControls enableZoom={true} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2, 10, 2]} intensity={1} />
        <Ground/>
        <Grid/>
        <SnapPoints/>
      </Canvas>
    </div>
  );
}

export default Edditor3d