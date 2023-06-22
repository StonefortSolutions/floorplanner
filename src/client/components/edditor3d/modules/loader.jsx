import { createWall } from "./createWall"
import ModelFetcher from "./modelFetcher";

export const rebuildScene = (scene) => {
  const output = [];
  for(let item of scene){
    if(item.itemId === 'wall'){
      output.push(createWall(item.transform.pt1, item.transform.pt2, item.id))
    }else{
      output.push((
        <ModelFetcher name={item.itemId}  position={item.transform.position}/>
      ));
    }
  }
  return output;
}