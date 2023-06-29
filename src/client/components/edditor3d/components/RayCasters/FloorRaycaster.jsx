import * as THREE from 'three'
import { useThree } from "@react-three/fiber"
import { useDispatch, useSelector } from "react-redux";
import { addToScene } from "../../../../store/scene";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from 'react'

const FloorRayCaster = ({camera}) => {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const [downPoint, setDownPoint] = useState({x:null,y:null});
  const [mouseUp, setMouseUp] = useState(true);
  const [model, setModel] = useState(null)
  const {scene, size} = new useThree()
  const selectedColor = useSelector(state => state.selectedColor)
  const dispatch = useDispatch();
    
  const onMouseDown = ( event ) => {
    if(event.button === 0){
      pointer.x = ( event.offsetX / size.width ) * 2 - 1;
	    pointer.y = - ( event.offsetY / size.height ) * 2 + 1;
      raycaster.setFromCamera( pointer, camera );
      const groundIntersect = raycaster.intersectObjects( scene.children ).filter(object => object.object.name === 'ground')[0];
      if (groundIntersect){
        setDownPoint({x:Math.floor(groundIntersect.point.x), y: Math.floor(groundIntersect.point.z)})
        setMouseUp(false);
      }
    }
  }

  const onMouseMove = ( event ) => {
    pointer.x = ( event.offsetX / size.width ) * 2 - 1;
	  pointer.y = - ( event.offsetY / size.height ) * 2 + 1;
    raycaster.setFromCamera( pointer, camera );
    const groundIntersect = raycaster.intersectObjects( scene.children ).filter(object => object.object.name === 'ground')[0];
    if(groundIntersect){
      let currentX = Math.floor(groundIntersect.point.x);
      let currentY = Math.floor(groundIntersect.point.z);
      const centerX = ((downPoint.x + currentX) / 2) + .5;
      const centerY = ((downPoint.y + currentY) / 2) + .5;
      const width = Math.abs(downPoint.x-currentX)
      const depth = Math.abs(downPoint.y-currentY)
      setModel( 
        <mesh
          position={[centerX, .55, centerY]}
          rotation={[-Math.PI / 2,0,0]}
        >
          <planeGeometry attach="geometry" args={[width + .5, depth + .5]} />
          <meshStandardMaterial color={selectedColor} />
        </mesh>
      );
    }else{
      setModel(null)
    }
  }

  const onMouseUp = (event) => {
    if(event.button === 0){
      pointer.x = ( event.offsetX / size.width ) * 2 - 1;
	    pointer.y = - ( event.offsetY / size.height ) * 2 + 1;
      raycaster.setFromCamera( pointer, camera );
      const groundIntersect = raycaster.intersectObjects( scene.children ).filter(object => object.object.name === 'ground')[0];
      if(groundIntersect){
        let currentX = Math.floor(groundIntersect.point.x);
        let currentY = Math.floor(groundIntersect.point.z);
        dispatch(
          addToScene({
            id: uuidv4(),
            itemId: "floor",
            transform: { pt1: downPoint, pt2: { x: currentX, y: currentY }, color: selectedColor },
          })
        );
      }
      setModel(null)
      setMouseUp(true);
    }
  }

  const canvas = document.getElementById('canvas1')
  canvas.onpointerdown = onMouseDown;
  canvas.onpointerup = onMouseUp;

  useEffect(()=>{
    if(mouseUp){
      canvas.onpointermove = null
    }else{
      canvas.onpointermove = onMouseMove
    }
  },[mouseUp])

  return model
}

export default FloorRayCaster