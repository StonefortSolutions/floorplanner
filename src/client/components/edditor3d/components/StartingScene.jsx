import { useThree } from "@react-three/fiber"

const StartingScene = ({startingScene}) => {
  const { scene } = useThree();
  for(let item of startingScene){
    scene.add(item);
  }
}

export default StartingScene