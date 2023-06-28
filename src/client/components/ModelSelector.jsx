import furnitureObjects from "./data/furnitureObjects";
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
import { Badge } from "./ui/Badge";

const ModelSelector = () => {
  const dispatch = useDispatch();
  const selectedModel = useSelector((store) => store.selectedModel);
  const currentAction = useSelector(store => store.currentAction);
  return (
    <div className="w-full hidden md:block">
      <h1 className="mb-2 px-2 text-lg font-semibold tracking-tight text-center">
        Furniture
      </h1>
      <ScrollArea className="h-[80vh] w-full">
        {furnitureObjects &&
          furnitureObjects.map(({ name, category, previewImage, path }) => {if(category === 'doorway'){return(
            <Card
              className={
                selectedModel === name
                  ? "m-2 bg-white bg-opacity-5 w-full"
                  : " m-2"
              }
              key={name}
            >
              <CardTitle>
                <h2 className="text-xl font-bold text-center">{name}</h2>
              </CardTitle>
              <CardDescription>
                <div className="flex justify-center my-1">
                  Type:
                  <Badge variant="outline" className="mx-1 ">
                    {category}
                  </Badge>
                </div>
              </CardDescription>
              <CardContent className="flex justify-center my-1">
                <img src={previewImage} alt={name} className="w-1/5 h-1/5" />
              </CardContent>
              <CardFooter className="flex justify-center flex-col">
                <Button
                  variant={selectedModel === path ? "secondary" : "default"}
                  onClick={() => dispatch(setModel(path))}
                >
                  {selectedModel === path ? "Selected" : "Select"}
                </Button>
              </CardFooter>
            </Card>
          )}})}
      </ScrollArea>
    </div>
  );
};

export default ModelSelector;
