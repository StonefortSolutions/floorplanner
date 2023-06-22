import { useDispatch, useSelector } from "react-redux"
import { setSelectedPoint } from "../../../store/selectedPoint"
import { useState } from "react";
import { addToScene } from "../../../store/scene";
import { v4 as uuidv4 } from "uuid"
import store from "../../../store"

const SnapPoints = () => {
  const dispatch = useDispatch()
  const {selectedPoint} = useSelector((state => state))

  const snapPoint = (x,y) => {
    const [hovered,setHovered] = useState(false);
    const [selected,setSelected] = useState(false)
    const clickHandler = async (x,y) => {
      dispatch(await setSelectedPoint({x,y}))
      const {currentAction,selectedModel} = store.getState()
      if(selectedPoint.x !== null  && (x === selectedPoint.x || y === selectedPoint.y)){
        if(currentAction === 'wall'){
          dispatch(addToScene({id: uuidv4(),itemId: 'wall', transform: {pt1:selectedPoint, pt2: {x,y}}}))
          dispatch(await setSelectedPoint({x:null,y:null}))
        }
      }else if(currentAction === 'placeItem' && selectedModel !== '' && selectedPoint.x !== null){
        dispatch(addToScene({id: uuidv4(),itemId: selectedModel, transform: {position:selectedPoint}}))
      }else{
        setSelected(true);
      }
    }

    return (
      <mesh 
        position={[x - 24.5 ,.1,y - 24.5]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        onClick={()=>clickHandler(x,y)} 
        key={`x:${x},y:${y}`} 
        onPointerOver={e => setHovered(true)} 
        onPointerOut={e => setHovered(false)}
      >
          <planeGeometry attach='geometry' args = {[.9,.9]}/>
          <meshStandardMaterial color={
            selected ? 'green' :
            hovered ? 'red' :
            (x === selectedPoint.x || y === selectedPoint.y) ? 'blue' :
            0x77ff00
          }/>
        </mesh>
    )
  }

  const output = [];

  for(let x = 0; x < 50; x++){
    for(let y = 0; y < 50; y++){
      output.push(snapPoint(x,y))
    }
  }

  return output
}

export default SnapPoints