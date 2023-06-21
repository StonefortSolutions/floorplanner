import { createWall } from "./createWall"

export const rebuildScene = (scene) => {
  const output = [];
  for(let item of scene){
    if(item.itemId === 'wall'){
      output.push(createWall(item.transform.pt1, item.transform.pt2, item.id))
    }
  }
  return output;
}