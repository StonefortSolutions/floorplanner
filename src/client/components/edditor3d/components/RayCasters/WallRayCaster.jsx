import * as THREE from 'three'
import { useThree } from "@react-three/fiber"
import { useDispatch, useSelector } from "react-redux";
import { addToScene } from "../../../../store/scene";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from 'react'

const WallRayCaster = ({camera}) => {
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
      let length;
      if(Math.abs(downPoint.x - currentX) > Math.abs(downPoint.y - currentY)){
        length = Math.abs(downPoint.x - currentX)
        currentY = downPoint.y
      }else{
        length = Math.abs(downPoint.y - currentY)
        currentX = downPoint.x
      }
      const centerX = ((downPoint.x + currentX) / 2) + .5;
      const centerY = ((downPoint.y + currentY) / 2) + .5;
      let rotation = 0;
      if (downPoint.y === currentY) {
        rotation = Math.PI / 2;
      }
      setModel( 
        <mesh
          position={[centerX, 4.5, centerY]}
          rotation={[0, rotation, 0]}
        >
          <boxGeometry attach="geometry" args={[.5, 8, length + .5]} />
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
        if(Math.abs(downPoint.x - currentX) > Math.abs(downPoint.y - currentY)){
          currentY = downPoint.y
        }else{
          currentX = downPoint.x
        }
        dispatch(
          addToScene({
            id: uuidv4(),
            itemId: "wall",
            transform: { 
              pt1: downPoint, 
              pt2: { x: currentX, y: currentY }, 
              color: selectedColor,
              height:8,
              bottom:0 
            },
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

export default WallRayCaster