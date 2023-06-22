import { useSelector } from "react-redux"
import { rebuildScene } from "../modules/loader"

const ItemRenderer = () => {
  const scene = useSelector(state=>state.scene)
  return rebuildScene(scene);
}

export default ItemRenderer