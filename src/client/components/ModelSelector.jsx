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
      <div className="max-h-[80vh] xl:max-h-[63vh] 2xl:max-h-[68vh] w-full flex flex-row flex-wrap overflow-y-scroll">
        {furnitureObjects &&
          furnitureObjects.map(({ name, category, previewImage, path }) =>{
            if(currentAction === 'door' && category !== 'doorway'){
              return null
            }
            return(
              <div
                className={
                  selectedModel === path
                    ? " bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full 2xl:w-[45%] m-1 2xl:m-2 backdrop-blur-md rounded-lg md:max-h-[25vh] min-h-[150px]"
                    : " w-full 2xl:w-[45%] m-1 2xl:m-2 hover:scale-105 md:max-h-[25vh] min-h-[150px]"
                }
              >
                <Card
                  className="m-0 bg-transparent h-full"
                  key={name}
                  onClick={() => dispatch(setModel(path))}
                >
                  <div className="h-[5em]">
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
                  </div>
                  <CardContent className="flex justify-center my-1">
                    <img src={previewImage} alt={name} className="w-1/5 h-1/5" />
                  </CardContent>
                </Card>
              </div>
            )
          })}
      </div>
      
    </div>
  );
};

export default ModelSelector;
