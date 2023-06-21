import React, {useState, useRef, useEffect} from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Ground from './components/Ground'
import Grid from './components/Grid';
import SnapPoints from './components/SnapPoints';
import * as THREE from 'three'
import { useDispatch, useSelector } from "react-redux"
import { loadScene } from '../../store/scene';
import { rebuildScene } from './modules/loader';
import StartingScene from './components/StartingScene';

const Editor3d = () => {
  const [is2D, setIs2D] = useState(true)
  const camera2D = new THREE.OrthographicCamera( -50 , 50 , -50 , 50 , .1, 100 )
  camera2D.translateY(50);
  camera2D.zoom = 11.6;
  const camera3D =new THREE.PerspectiveCamera(75, 50 / 50, 0.1, 1000)
  camera3D.translateY(50);
  camera3D.translateZ(50);

  const sceneState = useSelector(state => state.scene);

  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);
  const [StartingSceneArray, setStartingSceneArray] = useState([])

  useEffect(()=>{
    dispatch(loadScene())
  },[])

  useEffect(()=>{
    if(!loaded && sceneState !== null){
      setStartingSceneArray(rebuildScene(sceneState));
      setLoaded(true);
    }
  },[sceneState])

  return(
    <div id="edditor" className='w-[600px] h-[600px]'>
      <button onClick={()=>(setIs2D(!is2D))}>toggle perspective</button>
      <Canvas 
        id="canvas1"
        camera={is2D ? camera2D : camera3D}
        className='border-8 border-red-400'
        frameloop="demand"
      >
        <OrbitControls enableZoom={true} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2, 10, 2]} intensity={1} />
        <Ground/>
        <Grid/>
        <SnapPoints/>
        <StartingScene startingScene={StartingSceneArray}/>
      </Canvas>
    </div>
  );
}

export default Editor3d