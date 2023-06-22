import {EffectComposer, Noise, Bloom, Outline} from "@react-three/postprocessing"
import { useThree } from '@react-three/fiber';

const Effects = ({is2D}) => {
  const {scene} = useThree()
  console.log(scene.children)
  return(
    <EffectComposer multisampling={0} disableNormalPass={true}>
      {/* <Outline
        selection={scene.children}
        visibleEdgeColor={0xFF0000}
        selectionLayer={3}
        edgeStrength={.5}
        blur={true}
        xRay={true}
      /> */}
    </EffectComposer>
  )
}

export default Effects