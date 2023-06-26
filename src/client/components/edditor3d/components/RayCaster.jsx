import * as THREE from 'three'
import { useThree } from "@react-three/fiber"
import { useDispatch, useSelector } from "react-redux";
import { addToScene } from "../../../store/scene";
import {setSelectedPoint} from "../../../store/selectedPoint";
import { v4 as uuidv4 } from "uuid";

const RayCaster = ({camera}) => {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2()
  const {scene, gl, size} = new useThree()
  const selectedModel = useSelector(state => state.selectedModel)
  const selectedPoint = useSelector(state => state.selectedPoint)
  const currentAction = useSelector(state => state.currentAction)
  const selectedColor = useSelector(state => state.selectedColor)
  const rotation = useSelector(state => state.rotation)
  const dispatch = useDispatch();
  let count = 0;
    
  const onPointerClick = ( event ) => {
    if(event.srcElement.width === Math.floor(size.width) && event.srcElement.height === Math.floor(size.height)){
      pointer.x = ( event.offsetX / size.width ) * 2 - 1;
	    pointer.y = - ( event.offsetY / size.height ) * 2 + 1;
      raycaster.setFromCamera( pointer, camera );
      const intersect = raycaster.intersectObjects( scene.children ).filter(object => object.object.name === 'ground')[0].point;
      const x = Math.floor(intersect.x)
      const y = Math.floor(intersect.z)
      if (
        selectedPoint.x !== null &&
        (x === selectedPoint.x || y === selectedPoint.y)
        && currentAction === "wall"
      ){
        dispatch(
          addToScene({
            id: uuidv4(),
            itemId: "wall",
            transform: { pt1: selectedPoint, pt2: { x, y }, color: selectedColor },
          })
        );
        dispatch(setSelectedPoint({ x: null, y: null }));
      }
      else if(x !== selectedPoint.x && y !== selectedPoint.y && currentAction === 'room' && selectedPoint.x !== null){
        createRoom(selectedPoint,{x,y})
        dispatch(setSelectedPoint({ x: null, y: null }));
      }
      else if(x !== selectedPoint.x && y !== selectedPoint.y && currentAction === 'floor' && selectedPoint.x !== null){
        dispatch(
          addToScene({
            id: uuidv4(),
            itemId:"floor",
            transform: { pt1: selectedPoint, pt2: { x, y }, color: selectedColor },
          })
        )
        dispatch(setSelectedPoint({ x: null, y: null }));
      }
      else if (
        currentAction === "placeItem" &&
        selectedModel !== "" 
      ){
        dispatch(
          addToScene({
            id: uuidv4(),
            itemId: selectedModel,
            transform: { position: {x:x,y:y}, rotation: rotation },
          })
        );
      }
      else{
        dispatch(setSelectedPoint({x,y}))
      }
    }
  }

  const createRoom = (pt1,pt2) => {
    dispatch(
      addToScene({
        id: uuidv4(),
        itemId: "wall",
        transform: { pt1: pt1, pt2: { x: pt1.x, y: pt2.y }, color: selectedColor },
      })
    );
    dispatch(
      addToScene({
        id: uuidv4(),
        itemId: "wall",
        transform: { pt1: pt1, pt2: { x: pt2.x, y: pt1.y }, color: selectedColor },
      })
    );
    dispatch(
      addToScene({
        id: uuidv4(),
        itemId: "wall",
        transform: { pt1: pt2, pt2: { x: pt1.x, y: pt2.y }, color: selectedColor },
      })
    );
    dispatch(
      addToScene({
        id: uuidv4(),
        itemId: "wall",
        transform: { pt1: pt2, pt2: { x: pt2.x, y: pt1.y  }, color: selectedColor },
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

  const canvas = document.getElementById('canvas1')
  canvas.onclick = onPointerClick
}

export default RayCaster