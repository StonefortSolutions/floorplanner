import { OrbitControls } from "@react-three/drei";
import {useSelector} from 'react-redux'
import * as THREE from "three";
const Controls = ({is2D}) => {
  const currentAction = useSelector(state => state)
  return (
    <OrbitControls 
      enableRotate={!is2D} 
      mouseButtons={{
        LEFT: null,
        MIDDLE: THREE.MOUSE.ROTATE,
        RIGHT: THREE.MOUSE.PAN
      }}
      minPolarAngle={0}
      maxPolarAngle={Math.PI /2.1}
      minZoom={1}
      maxZoom={100}
    />
  )
}

export default Controls