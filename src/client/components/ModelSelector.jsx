import { furnitureNames } from "./data/furnitureName";
import { useDispatch, useSelector } from "react-redux";
import { setModel } from "../store/selectedModel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { Button } from "./ui/Button";

const ModelSelector = () => {
  const dispatch = useDispatch();
  const selectedModel = useSelector(store => store.selectedModel);
  return (
    <div>
      <h1 className="mb-2 px-2 text-lg font-semibold tracking-tight">
        furniture
      </h1>
      <div className="overflow-y-scroll overflow-x-hidden flex flex-row flex-wrap lg:w-[500px] lg:h-[700px]">
        {furnitureNames.map((name) => (
          <Card className={selectedModel === name ? "w-52 m-2 bg-white bg-opacity-5" : "w-52 m-2"} key={name}>
            <CardHeader>
              <CardDescription>{name}</CardDescription>
            </CardHeader>
            <CardContent>
              <img src={`/ItemPictures/${name}_SE.png`} />
            </CardContent>
            <CardFooter>
              <Button
                variant={selectedModel === name ? "secondary" : "ghost"}
                onClick={() => dispatch(setModel(name))}
              >
                Select
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ModelSelector;
