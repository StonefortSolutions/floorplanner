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
import { ScrollArea } from "./ui/Scroll-Area";

const ModelSelector = () => {
  const dispatch = useDispatch();
  const selectedModel = useSelector((store) => store.selectedModel);
  return (
    <div className="h-[100vh] w-full hidden md:block">
      <h1 className="mb-2 px-2 text-lg font-semibold tracking-tight text-center">
        Furniture
      </h1>
      <ScrollArea className="h-[calc(100vh-2rem)] w-full">
        {furnitureNames.map((name) => (
          <Card
            className={
              selectedModel === name
                ? "m-2 bg-white bg-opacity-5 w-full"
                : " m-2"
            }
            key={name}
          >
            <CardHeader>
              <h2 className="text-xl font-bold text-center">{name}</h2>
            </CardHeader>
            <CardContent className="flex justify-center">
              <img
                src={`/ItemPictures/${name}_SE.png`}
                alt={name}
                className="w-1/5 h-1/5"
              />
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                variant={selectedModel === name ? "secondary" : "ghost"}
                onClick={() => dispatch(setModel(name))}
              >
                Select
              </Button>
            </CardFooter>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
};

export default ModelSelector;
