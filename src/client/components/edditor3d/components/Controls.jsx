import { OrbitControls } from "@react-three/drei";
import {useSelector} from 'react-redux'
import * as THREE from "three";
import {useState, useEffect} from "react"
const Controls = ({is2D, camera}) => {
  const [transform, setTransform] = useState({position: null, rotation: null, quaternion: null})
  const canvas = document.getElementById('canvas1')
  const currentAction = useSelector(state => state.currentAction)
  const controls = (
    <OrbitControls 
      domElement={canvas}
      camera={camera}
      target={[0,0,0]}
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
      onChange={() => {change()}}
    />
  )

  const change = () => {
    setTransform({position:controls.props.camera.position,rotation:controls.props.camera.rotation,quaternion:controls.props.camera.quaternion})
  }

  useEffect(()=>{
    if(transform.position !== null){
      controls.props.camera.position.set(transform.position.x,transform.position.y,transform.position.z)
      controls.props.camera.rotation.set(transform.rotation.x,transform.rotation.y,transform.rotation.z,"XYZ")
      controls.props.camera.quaternion.set(transform.quaternion.x,transform.quaternion.y,transform.quaternion.z,transform.quaternion.w)
    }
  },[currentAction])

  return controls
}

export default Controls