import {EffectComposer, Noise, Bloom, Outline} from "@react-three/postprocessing"
import { useThree } from '@react-three/fiber';

const Effects = ({is2D}) => {
  const {scene} = useThree()
  return(
    <EffectComposer multisampling={0} disableNormalPass={true}>
      <Bloom
        intensity={.2}
      />
    </EffectComposer>
  )
}

export default Effects