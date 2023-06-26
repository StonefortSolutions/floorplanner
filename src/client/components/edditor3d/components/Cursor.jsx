import {useSelector} from 'react-redux'

const Cursor = () => {
  const currentAction = useSelector(state => state.currentAction);
  const selectedPoint = useSelector(state => state.selectedPoint);

  if(selectedPoint.x !== null){
    return(
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[selectedPoint.x + .5,.6,selectedPoint.y + .5]}>
        <planeGeometry args={[1,1]} />
        <meshBasicMaterial color='red' />
      </mesh>
    )
  }
}

export default Cursor