import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'
import { v4 as uuidv4 } from "uuid";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three'
import { useThree } from "@react-three/fiber"
import { rotate } from '../../../../store/rotation';
import { addToScene, deleteFromScene } from "../../../../store/scene";

const DoorRayCaster = ({camera}) => {
  const currentAction = useSelector(state => state.currentAction);
  const selectedModel = useSelector(state => state.selectedModel)
  const sceneState = useSelector(state => state.scene);
  const [model, setModel] = useState(null);
  const [data, setData] = useState("");
  const loader = new GLTFLoader();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2()
  const {scene, size} = new useThree()
  const dispatch = useDispatch()

  useEffect(()=>{
    const canvas = document.getElementById('canvas1')
    if(currentAction === 'door' && selectedModel !== ''){
      canvas.onmousemove = onPointerMove
      canvas.onclick = onMouseClick
    }else{
      canvas.onmousemove = null
      canvas.onclick = null
    }
  },[currentAction,selectedModel,data, camera, sceneState])

  useEffect(() => {
    if(selectedModel !== ''){
      loader.load(`/${selectedModel}.glb`, (data) => setData(data));
    }
  }, [selectedModel]);

  const onPointerMove = (event) => {
    pointer.x = ( event.offsetX / size.width ) * 2 - 1;
	  pointer.y = - ( event.offsetY / size.height ) * 2 + 1;
    raycaster.setFromCamera( pointer, camera );
    const wallIntersect = raycaster.intersectObjects( scene.children ).filter(object => object.object.name === 'wall')[0];
    if(wallIntersect){
      const position = [Math.floor(wallIntersect.point.x) + .25,.5,Math.floor(wallIntersect.point.z) + .75]
      let boxPosition = [Math.floor(wallIntersect.point.x) + .5,3,Math.floor(wallIntersect.point.z) + 1.95]
      if(wallIntersect.object.rotation.y > 0){
        boxPosition = [Math.floor(wallIntersect.point.x) + 1.45,3,Math.floor(wallIntersect.point.z) + .5]
      }
      const rotation = wallIntersect.object.rotation.y - (Math.PI / 2)
      setModel([
        <primitive
          object={data.scene}
          scale={[5, 5, 5]}
          position={position}
          rotation={[0,rotation,0]}
        />,
        <mesh
          rotation={[0,wallIntersect.object.rotation.y,0]}
          position={boxPosition}
        >
          <boxGeometry attach="geometry" args={[.8, 5, 2.4]} />
          <meshPhongMaterial color={"red"} opacity={.5} transparent={true}/>
        </mesh>
      ] 
        
      );
    }else{
      setModel(null)
    }
  }

  const onMouseClick = (event) => {
    if(event.button === 0){
      pointer.x = ( event.offsetX / size.width ) * 2 - 1;
	    pointer.y = - ( event.offsetY / size.height ) * 2 + 1;
      raycaster.setFromCamera( pointer, camera );
      const wallIntersect = raycaster.intersectObjects( scene.children ).filter(object => object.object.name === 'wall')[0];
      if(wallIntersect){
        const rotation = wallIntersect.object.rotation.y - (Math.PI / 2)
        const previousWall = sceneState.find(item => item.id === wallIntersect.object.userData.id)
        console.log(sceneState)
        if(previousWall.transform.pt1.x === previousWall.transform.pt2.x){
          if(previousWall.transform.pt1.y > previousWall.transform.pt2.y){
            //top
            dispatch(
              addToScene({
                id: uuidv4(),
                itemId: 'wall',
                transform: {
                  pt1: previousWall.transform.pt2, 
                  pt2: {
                    x:Math.floor(wallIntersect.point.x),
                    y:Math.floor(wallIntersect.point.z)
                  }, 
                  color: previousWall.transform.color, 
                  height:8,
                  bottom:0
                }
              })
            )
            //middle
            dispatch(
              addToScene({
                id: uuidv4(),
                itemId: 'wall',
                transform: {
                  pt1: {
                    x:Math.floor(wallIntersect.point.x),
                    y:Math.floor(wallIntersect.point.z)
                  }, 
                  pt2: {
                    x:Math.floor(wallIntersect.point.x),
                    y:Math.floor(wallIntersect.point.z) + 2.44
                  }, 
                  color: previousWall.transform.color, 
                  height:2.95,
                  bottom:5.05
                }
              })
            )
            //bottom
            dispatch(
              addToScene({
                id: uuidv4(),
                itemId: 'wall',
                transform: {
                  pt1: {
                    x:Math.floor(wallIntersect.point.x),
                    y:Math.floor(wallIntersect.point.z) + 2.94
                  }, 
                  pt2: previousWall.transform.pt1, 
                  color: previousWall.transform.color, 
                  height:8,
                  bottom:0
                }
              })
            )
          }else{
            //top
            dispatch(
              addToScene({
                id: uuidv4(),
                itemId: 'wall',
                transform: {
                  pt1: previousWall.transform.pt1, 
                  pt2: {
                    x:Math.floor(wallIntersect.point.x),
                    y:Math.floor(wallIntersect.point.z)
                  }, 
                  color: previousWall.transform.color, 
                  height:8,
                  bottom:0
                }
              })
            )
            //middle
            dispatch(
              addToScene({
                id: uuidv4(),
                itemId: 'wall',
                transform: {
                  pt1: {
                    x:Math.floor(wallIntersect.point.x),
                    y:Math.floor(wallIntersect.point.z)
                  }, 
                  pt2: {
                    x:Math.floor(wallIntersect.point.x),
                    y:Math.floor(wallIntersect.point.z) + 2.44
                  }, 
                  color: previousWall.transform.color, 
                  height:2.95,
                  bottom:5.05
                }
              })
            )
            //bottom
            dispatch(
              addToScene({
                id: uuidv4(),
                itemId: 'wall',
                transform: {
                  pt1: {
                    x:Math.floor(wallIntersect.point.x),
                    y:Math.floor(wallIntersect.point.z) + 2.94
                  }, 
                  pt2: previousWall.transform.pt2, 
                  color: previousWall.transform.color, 
                  height:8,
                  bottom:0
                }
              })
            )
          }
        }else{
          if(previousWall.transform.pt1.x > previousWall.transform.pt2.x){
            //left
            dispatch(
              addToScene({
                id: uuidv4(),
                itemId: 'wall',
                transform: {
                  pt1: previousWall.transform.pt2, 
                  pt2: {
                    x:Math.floor(wallIntersect.point.x) - .5,
                    y:Math.floor(wallIntersect.point.z)}, 
                  color: previousWall.transform.color, 
                  height:8,
                  bottom:0
                }
              })
            )
            //center
            dispatch(
              addToScene({
                id: uuidv4(),
                itemId: 'wall',
                transform: {
                  pt1: {
                    x:Math.floor(wallIntersect.point.x),
                    y:Math.floor(wallIntersect.point.z)
                  }, 
                  pt2: {
                    x:Math.floor(wallIntersect.point.x) + 1.94,
                    y:Math.floor(wallIntersect.point.z)
                  }, 
                  color: previousWall.transform.color, 
                  height:2.95,
                  bottom:5.05
                }
              })
            )
            //right
            dispatch(
              addToScene({
                id: uuidv4(),
                itemId: 'wall',
                transform: {
                  pt1: {
                    x:Math.floor(wallIntersect.point.x) + 2.43,
                    y:Math.floor(wallIntersect.point.z)
                  }, 
                  pt2: previousWall.transform.pt1, 
                  color: previousWall.transform.color, 
                  height:8,
                  bottom:0
                }
              })
            )
          }else{
            //left
            dispatch(
              addToScene({
                id: uuidv4(),
                itemId: 'wall',
                transform: {
                  pt1: previousWall.transform.pt1, 
                  pt2: {
                    x:Math.floor(wallIntersect.point.x) - .5,
                    y:Math.floor(wallIntersect.point.z)
                  }, 
                  color: previousWall.transform.color, 
                  height:8,
                  bottom:0
                }
              })
            )
            //center
            dispatch(
              addToScene({
                id: uuidv4(),
                itemId: 'wall',
                transform: {
                  pt1: {
                    x:Math.floor(wallIntersect.point.x),
                    y:Math.floor(wallIntersect.point.z)
                  }, 
                  pt2: {
                    x:Math.floor(wallIntersect.point.x) + 1.94,
                    y:Math.floor(wallIntersect.point.z)
                  }, 
                  color: previousWall.transform.color, 
                  height:2.95,
                  bottom:5.05
                }
              })
            )
            //right
            dispatch(
              addToScene({
                id: uuidv4(),
                itemId: 'wall',
                transform: {
                  pt1: {
                    x:Math.floor(wallIntersect.point.x) + 2.43,
                    y:Math.floor(wallIntersect.point.z)
                  }, 
                  pt2: previousWall.transform.pt2, 
                  color: previousWall.transform.color, 
                  height:8,
                  bottom:0
                }
              })
            )
          }
        }
        dispatch(
          addToScene({
            id: uuidv4(),
            itemId: selectedModel,
            transform: { position: {x:Math.floor(wallIntersect.point.x) + .25,y:Math.floor(wallIntersect.point.z) + .75}, rotation: rotation },
          })
        );
        dispatch(deleteFromScene(wallIntersect.object.userData.id))
      }
    }
  }

  return model;
}

export default DoorRayCaster
