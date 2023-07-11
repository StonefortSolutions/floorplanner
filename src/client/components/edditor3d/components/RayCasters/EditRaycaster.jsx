import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'
import { v4 as uuidv4 } from "uuid";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three'
import { useThree } from "@react-three/fiber"
import { rotate } from '../../../../store/rotation';
import { addToScene } from "../../../../store/scene";

const EditRaycaster = ({camera}) => {
  const currentAction = useSelector(state => state.currentAction);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2()
  const {scene, size} = new useThree()
  const dispatch = useDispatch()

  useEffect(()=>{
    const canvas = document.getElementById('canvas1')
    if(currentAction === 'edit'){
      canvas.onclick = onMouseClick
    }else{
      canvas.onclick = null
    }
  },[currentAction, camera])

  // useEffect(() => {
  //   if(selectedModel !== ''){
  //     loader.load(`/${selectedModel}.glb`, (data) => setData(data));
  //   }
  // }, [selectedModel]);


  const onMouseClick = (event) => {
    if(event.button === 0){
      pointer.x = ( event.offsetX / size.width ) * 2 - 1;
	    pointer.y = - ( event.offsetY / size.height ) * 2 + 1;
      raycaster.setFromCamera( pointer, camera );
      const firstIntersect = raycaster.intersectObjects( scene.children )[0];
      console.log(firstIntersect);
    }
  }
}

export default EditRaycaster