import { furnitureNames } from "./data/furnitureName";
import { useDispatch } from "react-redux";
import { setSelectedModel } from "../store/editor";
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
  return (
    <div>
      <h1 className="mb-2 px-2 text-lg font-semibold tracking-tight">
        furniture
      </h1>
      <div className="overflow-y-scroll overflow-x-hidden flex flex-row flex-wrap lg:w-[500px] lg:h-[700px]">
        {furnitureNames.map((name) => (
          <Card className="w-52 m-2" key={name}>
            <CardHeader>
              <CardDescription>{name}</CardDescription>
            </CardHeader>
            <CardContent>
              <img src={`/ItemPictures/${name}_SE.png`} />
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => dispatch(setSelectedModel(name))}
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
