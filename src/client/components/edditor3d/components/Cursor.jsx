import {useSelector} from 'react-redux'

const Cursor = () => {
  const currentAction = useSelector(state => state.currentAction);
  const selectedPoint = useSelector(state => state.selectedPoint);

  if(selectedPoint.x !== null){
    return(
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[selectedPoint.x - 24.5 ,.1,selectedPoint.y - 24.5]}>
        <planeGeometry args={[1,1]} />
        <meshBasicMaterial color='red' />
      </mesh>
    )
  }
}

export default Cursor