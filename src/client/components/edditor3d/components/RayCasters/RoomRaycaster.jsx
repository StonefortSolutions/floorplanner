import * as THREE from 'three'
import { useThree } from "@react-three/fiber"
import { useDispatch, useSelector } from "react-redux";
import { addToScene } from "../../../../store/scene";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from 'react'

const RoomRayCaster = ({camera}) => {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const [downPoint, setDownPoint] = useState({x:null,y:null});
  const [mouseUp, setMouseUp] = useState(true);
  const [model, setModel] = useState(null)
  const {scene, size} = new useThree()
  const selectedColor = useSelector(state => state.selectedColor)
  const dispatch = useDispatch();
  
  const floor = (pt1, pt2) => {
    const centerX = ((pt1.x + pt2.x) / 2) + .5;
    const centerY = ((pt1.y + pt2.y) / 2) + .5;
    const width = Math.abs(pt1.x-pt2.x)
    const depth = Math.abs(pt1.y-pt2.y)
    return( 
      <mesh
        position={[centerX, .55, centerY]}
        rotation={[-Math.PI / 2,0,0]}
      >
        <planeGeometry attach="geometry" args={[width + .5, depth + .5]} />
        <meshStandardMaterial color={selectedColor} />
      </mesh>
    );
  }

  const wall = (pt1,pt2) => {
    const centerX = ((pt1.x + pt2.x) / 2) + .5;
    const centerY = ((pt1.y + pt2.y) / 2) + .5;
    let rotation = 0;
    if (pt1.y === pt2.y) {
      rotation = Math.PI / 2;
    }
    const length =
      Math.sqrt(
        Math.abs(
          Math.pow(pt2.x - pt1.x, 2) - Math.pow(pt2.y - pt1.y, 2)
        )
      ) + 1;
    return( 
      <mesh
        position={[centerX, 4.5, centerY]}
        rotation={[0, rotation, 0]}
      >
        <boxGeometry attach="geometry" args={[.5, 8, length - .5]} />
        <meshStandardMaterial color={selectedColor} />
      </mesh>
    );
  }

  const createRoom = (pt1,pt2) => {
    dispatch(
      addToScene({
        id: uuidv4(),
        itemId: "wall",
        transform: { 
          pt1: pt1, 
          pt2: { x: pt1.x, y: pt2.y }, 
          color: selectedColor,
          height:8,       
          bottom:0 
        },
      })
    );
    dispatch(
      addToScene({
        id: uuidv4(),
        itemId: "wall",
        transform: { 
          pt1: pt1, 
          pt2: { x: pt2.x, y: pt1.y }, 
          color: selectedColor,
          height:8,
          bottom:0 
        },
      })
    );
    dispatch(
      addToScene({
        id: uuidv4(),
        itemId: "wall",
        transform: { 
          pt1: 
          pt2, 
          pt2: { x: pt1.x, y: pt2.y }, 
          color: selectedColor,
          height:8,
          bottom:0 
        },
      })
    );
    dispatch(
      addToScene({
        id: uuidv4(),
        itemId: "wall",
        transform: { 
          pt1: pt2, 
          pt2: { x: pt2.x, y: pt1.y  }, 
          color: selectedColor,
          height:8,
          bottom:0 
        },
      })
    );
    dispatch(
      addToScene({
        id: uuidv4(),
        itemId:"floor",
        transform: { pt1, pt2, color: selectedColor },
      })
    )
  }

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
    let room = [];
    if(groundIntersect){
      let currentX = Math.floor(groundIntersect.point.x);
      let currentY = Math.floor(groundIntersect.point.z);
      room.push(floor(downPoint,{x:currentX,y:currentY}))
      room.push(wall(downPoint,{x:downPoint.x,y:currentY}))
      room.push(wall(downPoint,{x:currentX,y:downPoint.y}))
      room.push(wall({x:currentX,y:currentY},{x:currentX,y:downPoint.y}))
      room.push(wall({x:currentX,y:currentY},{x:downPoint.x,y:currentY}))
      setModel(room);
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
        createRoom(downPoint,{x:currentX,y:currentY})
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

export default RoomRayCaster