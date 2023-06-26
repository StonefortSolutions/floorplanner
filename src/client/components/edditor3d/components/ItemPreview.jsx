import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'
import {Loader} from '@react-three/drei'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three'
import { useThree } from "@react-three/fiber"
import { rotate } from '../../../store/rotation';

const ItemPreview = ({camera}) => {
  const currentAction = useSelector(state => state.currentAction);
  const selectedModel = useSelector(state => state.selectedModel)
  const rotation = useSelector(state => state.rotation);
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
      canvas.onwheel = onWheel
    }else{
      canvas.onmousemove = null
      canvas.onwheel = null
    }
  },[currentAction,selectedModel,data, camera, rotation])

  useEffect(() => {
    loader.load(`/${selectedModel}.glb`, (data) => setData(data));
  }, [selectedModel]);

  const onPointerMove = (event) => {
    pointer.x = ( event.offsetX / size.width ) * 2 - 1;
	  pointer.y = - ( event.offsetY / size.height ) * 2 + 1;
    raycaster.setFromCamera( pointer, camera );
    const groundIntersect = raycaster.intersectObjects( scene.children ).filter(object => object.object.name === 'ground')[0];
    if(groundIntersect){
      setModel( 
        <primitive
          object={data.scene}
          scale={[10, 10, 10]}
          position={[Math.floor(groundIntersect.point.x),1.5,Math.floor(groundIntersect.point.z)]}
          rotation={[0,rotation,0]}
        />
      );
    }else{
      setModel(null)
    }
  }

  const onWheel = (event) => {
    if(event.deltaY > 0){
      dispatch(rotate(Math.PI/2))
      console.log(model);
    }else{
      dispatch(rotate(Math.PI/-2))
    }
    console.log("ran")
    console.log(event);
  }

  return model;
}

export default ItemPreview