import * as THREE from 'three'
import { useThree } from "@react-three/fiber"
import { useSelector, useDispatch } from "react-redux";
import { addToScene } from "../../../store/scene";
import {setSelectedPoint} from "../../../store/selectedPoint";
import { v4 as uuidv4 } from "uuid";

const RayCaster = ({camera}) => {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2()
  const {scene, gl, size} = new useThree()
  const selectedModel = useSelector(state => state.selectedModel);
  const selectedPoint = useSelector(state => state.selectedPoint);
  const currentAction = useSelector(state => state.currentAction)
  const dispatch = useDispatch();

  const clickHandler = async (x, y) => {
    dispatch(setSelectedPoint({ x, y }));
    if (
      selectedPoint.x !== null &&
      (x === selectedPoint.x || y === selectedPoint.y)
    ) {
      if (currentAction === "wall") {
        dispatch(
          addToScene({
            id: uuidv4(),
            itemId: "wall",
            transform: { pt1: selectedPoint, pt2: { x, y } },
          })
        );
        dispatch(setSelectedPoint({ x: null, y: null }));
      }
    } else if (
      currentAction === "placeItem" &&
      selectedModel !== "" 
    ) {
      dispatch(
        addToScene({
          id: uuidv4(),
          itemId: selectedModel,
          transform: { position: {x,y} },
        })
      );
    }
  }

  function onPointerClick( event ) {
    //checks if element clicked is the canvas
    if(event.srcElement.width === Math.floor(size.width) && event.srcElement.height === Math.floor(size.height)){
      pointer.x = ( event.offsetX / size.width ) * 2 - 1;
	    pointer.y = - ( event.offsetY / size.height ) * 2 + 1;
      raycaster.setFromCamera( pointer, camera );
      const intersect = raycaster.intersectObjects( scene.children ).filter(object => object.object.name === 'ground')[0].point;
      clickHandler(Math.floor(intersect.x) + 25, Math.floor(intersect.z) + 25)
    }
  }
  window.addEventListener( 'click', onPointerClick );
}

export default RayCaster