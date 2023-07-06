import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'
import { v4 as uuidv4 } from "uuid";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three'
import { useThree } from "@react-three/fiber"
import { rotate } from '../../../../store/rotation';
import { addToScene } from "../../../../store/scene";

const ItemRayCaster = ({camera}) => {
  const currentAction = useSelector(state => state.currentAction);
  const selectedModel = useSelector(state => state.selectedModel)
  const rotation = useSelector(state => state.rotation);
  const {GRID_VISIBLE} = useSelector(state => state.grid)
  const [model, setModel] = useState(null);
  const [data, setData] = useState("");
  const loader = new GLTFLoader();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2()
  const {scene, size} = new useThree()
  const dispatch = useDispatch()

  useEffect(()=>{
    const canvas = document.getElementById('canvas1')
    if(currentAction === 'placeItem' && selectedModel !== ''){
      canvas.onmousemove = onPointerMove
      canvas.onclick = onMouseClick
    }else{
      canvas.onmousemove = null
      canvas.onclick = null
    }
  },[currentAction,selectedModel,data, camera, rotation])

  useEffect(() => {
    if(selectedModel !== ''){
      loader.load(`/${selectedModel}.glb`, (data) => setData(data));
    }
  }, [selectedModel]);

  const onPointerMove = (event) => {
    pointer.x = ( event.offsetX / size.width ) * 2 - 1;
	  pointer.y = - ( event.offsetY / size.height ) * 2 + 1;
    raycaster.setFromCamera( pointer, camera );
    const groundIntersect = raycaster.intersectObjects( scene.children ).filter(object => object.object.name === 'ground')[0];
    if(groundIntersect){
      let position = [groundIntersect.point.x,1.5,groundIntersect.point.z]
      if(GRID_VISIBLE){
        position = [Math.floor(groundIntersect.point.x),1.5,Math.floor(groundIntersect.point.z)]
      }
      setModel( 
        <primitive
          object={data.scene}
          scale={[5, 5, 5]}
          position={position}
          rotation={[0,rotation,0]}
        />
      );
    }else{
      setModel(null)
    }
  }

  // const onWheel = (event) => {
  //   if(event.deltaY > 0){
  //     dispatch(rotate(Math.PI/2))
  //     console.log(model);
  //   }else{
  //     dispatch(rotate(Math.PI/-2))
  //   }
  // }

  const onMouseClick = (event) => {
    if(event.button === 0){
      pointer.x = ( event.offsetX / size.width ) * 2 - 1;
	    pointer.y = - ( event.offsetY / size.height ) * 2 + 1;
      raycaster.setFromCamera( pointer, camera );
      const groundIntersect = raycaster.intersectObjects( scene.children ).filter(object => object.object.name === 'ground')[0];
      dispatch(
        addToScene({
          id: uuidv4(),
          itemId: selectedModel,
          transform: { position: {x:Math.floor(groundIntersect.point.x),y:Math.floor(groundIntersect.point.z)}, rotation: rotation },
        })
      );
    }
  }

  return model;
}

export default ItemRayCaster