import Wall from "../components/Wall";
import ModelFetcher from "./modelFetcher";

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
        />
      );
    } else {
      output.push(
        <ModelFetcher
          key={item.id}
          name={item.itemId}
          position={item.transform.position}
        />
      );
    }
  }
  return output;
};
