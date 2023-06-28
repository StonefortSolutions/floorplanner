import Wall from "../components/Wall";
import ModelFetcher from "./modelFetcher";
import Floor from "../components/Floor";

export const rebuildScene = (scene) => {
  const output = [];
  for (let item of scene) {
    if (item.itemId === "wall") {
      output.push(
        <Wall
          key={item.id}
          point1={item.transform.pt1}
          point2={item.transform.pt2}
          id={item.id}
          color={item.transform.color}
          height={item.transform.height}
          bottom={item.transform.bottom}
        />
      );
    } else if(item.itemId === "floor"){
      output.push(
        <Floor
          key={item.id}
          point1={item.transform.pt1}
          point2={item.transform.pt2}
          id={item.id}
          color={item.transform.color}
        />
      )
    } else {
      output.push(
        <ModelFetcher
          key={item.id}
          name={item.itemId}
          position={item.transform.position}
          rotation={[0,item.transform.rotation,0]}
        />
      );
    }
  }
  return output;
};
