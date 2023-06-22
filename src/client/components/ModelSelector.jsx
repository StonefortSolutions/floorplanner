import { furnitureNames } from "./data/furnitureName"
import {useDispatch} from 'react-redux'
import { setModel } from "../store/selectedModel";

const ModelSelector = () => {
  const dispatch = useDispatch();
  console.log(furnitureNames)
  return(
    <div className="w-48 h-48 overflow-y-scroll">
      {furnitureNames.map((name)=>(
        <button onClick={() => dispatch(setModel(name))}>
          {name}
        </button>
      ))}
    </div>
  )
}

export default ModelSelector;