import React, {useState, useRef} from 'react'
import { Canvas } from '@react-three/fiber';
import { DragControls } from './modules/dragControls';
import { OrbitControls } from '@react-three/drei';
import Ground from './components/Ground'
import Grid from './components/Grid';
import SnapPoints from './components/SnapPoints';
import * as THREE from 'three'

const Edditor3d = () => {
  const [is2D, setIs2D] = useState(true)
  const camera2D = new THREE.OrthographicCamera( 10 / - 2, 10 / 2, 10 / 2, 10 / - 2, 1, 1000 )
  camera2D.translateY(50);
  const camera3D =new THREE.PerspectiveCamera(75, 50 / 50, 0.1, 1000)
  camera3D.translateY(50);
  camera3D.translateX(50);
  return (
    <div id="edditor" className='w-[1000px] h-[600px]'>
      <button onClick={()=>(setIs2D(!is2D))}>toggle perspective</button>
      <Canvas 
        id="canvas1"
        camera={is2D ? camera2D : camera3D}
      >
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