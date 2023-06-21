import * as THREE from 'three'
import { useThree } from "@react-three/fiber"

const RayCaster = ({camera}) => {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const {scene, gl} = new useThree()

  function onPointerClick( event ) {
	  pointer.x = ( event.clientX / gl.domElement.clientWidth ) * 2 - 1;
	  pointer.y = - ( event.clientY / gl.domElement.clientHeight ) * 2 + 1;
    console.log(pointer)

    raycaster.setFromCamera( pointer, camera );
    raycaster.layers.set(2);
    const intersects = raycaster.intersectObjects( scene.children );
    for(let obj of intersects){
      obj.material.color.set(0xff0000)
    }
    console.log(intersects);
  }

  window.addEventListener( 'mousemove', onPointerClick );
}

export default RayCaster