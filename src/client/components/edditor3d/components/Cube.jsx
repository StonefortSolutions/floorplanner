const Cube = () => {
  return (
    <mesh position={[2.5,2.5,2.5]}>
      <boxGeometry attach='geometry' args = {[5,5,5]}/>
      <meshStandardMaterial />
    </mesh>
  )
}

export default Cube