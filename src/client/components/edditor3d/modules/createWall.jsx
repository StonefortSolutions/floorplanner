import * as THREE from 'three'
import { useThree } from "@react-three/fiber"

//(b2 + c2 − a2) / 2bc

export const createWall = (pt1,pt2,id) => {
  //const pt3 = {x:pt1.x + 1,y:pt1.y};
  const centerX = (Math.abs(pt1.x + pt2.x)/2) - 25
  const centerY = (Math.abs(pt1.y + pt2.y)/2) - 25
  // const side1 = Math.sqrt(Math.abs(Math.pow(pt2.x-pt3.x,2) - Math.pow(pt2.y-pt3.y,2)));
  // const side2 = Math.sqrt(Math.abs(Math.pow(pt3.x-pt1.x,2) - Math.pow(pt3.y-pt1.y,2)));
  // const side3 = Math.sqrt(Math.abs(Math.pow(pt2.x-pt1.x,2) - Math.pow(pt2.y-pt1.y,2)));
  // console.log(side1,side2,side3);
  // console.log((Math.pow(side1,2) + Math.pow(side2,2) - Math.pow(side3,2)) / 2*side1*side2)
  // console.log((Math.pow(side1,2) + Math.pow(side2,2) - Math.pow(side3,2)), (2*side1*side2))
  // const ang3 = Math.acos((Math.pow(side1,2) + Math.pow(side2,2) - Math.pow(side3,2)) / (2*side1*side2))
  // console.log(ang3);
  const geometry = new THREE.BoxGeometry( 1, 8, Math.sqrt(Math.abs(Math.pow(pt2.x-pt1.x,2) - Math.pow(pt2.y-pt1.y,2))) + 1);
  const material = new THREE.MeshBasicMaterial( { color: 0x5e461f } );
  const wall = new THREE.Mesh( geometry, material );
  wall.translateX(centerX +.5)
  wall.translateZ(centerY+.5)
  wall.translateY(4);
  wall.name = id;
  if(pt1.y === pt2.y){
    wall.rotateY(Math.PI / 2)
  }
  return wall;
}
