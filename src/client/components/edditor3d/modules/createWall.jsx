import { useDispatch, useSelector } from "react-redux"
import { deleteFromScene } from "../../../store/scene"
import store from "../../../store"

export const createWall = (pt1,pt2,id) => {
  const dispatch = useDispatch();
  const clickHandler = () => {
    const currentAction = store.getState().currentAction
    if(currentAction === 'delete'){
      dispatch(deleteFromScene(id));
    }
  }

  const centerX = (Math.abs(pt1.x + pt2.x)/2) - 24.5
  const centerY = (Math.abs(pt1.y + pt2.y)/2) - 24.5
  let rotaion = 0;
  if(pt1.y === pt2.y){
    rotaion = Math.PI / 2
  }

  const wall = (
    <mesh 
      position={[centerX,4,centerY]} 
      rotation={[0,rotaion,0]}
      onClick={()=>clickHandler()}
      key={id}
    >
      <boxGeometry attach='geometry' args = {[1,8,Math.sqrt(Math.abs(Math.pow(pt2.x-pt1.x,2) - Math.pow(pt2.y-pt1.y,2))) + 1]}/>
      <meshStandardMaterial color = {0x5e461f}/>
    </mesh>
  )
  return wall;
}
