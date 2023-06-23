import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Ground from "./components/Ground";
import Grid from "./components/Grid";
import * as THREE from "three";
import { useDispatch, useSelector } from "react-redux";
import { loadScene } from "../../store/scene";
import RayCaster from "./components/RayCaster";
import ItemRenderer from "./components/ItemRenderer";
import { Button } from "../ui/Button";
import { GlobeIcon, GridIcon } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "../ui/Tooltip";
import Effects from "./components/Effects";
import Cursor from "./components/Cursor";

const Editor3d = () => {
  const [is2D, setIs2D] = useState(true);
  const { GRID_SIZE } = useSelector((state) => state.editor);
  const camera2D = new THREE.OrthographicCamera(-50, 50, -50, 50, 0.1, 100);
  camera2D.translateY(50);
  camera2D.zoom = 11.6;
  const camera3D = new THREE.PerspectiveCamera(75, 50 / 50, 0.1, 1000);
  camera3D.translateY(50);
  camera3D.translateZ(50);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadScene());
  }, []);

  return (
    <div id="edditor" className="leading-none h-[98%] relative">
      <Canvas
        id="canvas1"
        camera={is2D ? camera2D : camera3D}
        className="border-8 border-primary-forground"
        frameloop="demand"
      >
        <OrbitControls enable={!is2D} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2, 10, 2]} intensity={1} />
        <Ground size={GRID_SIZE} />
        <Grid
          size={GRID_SIZE}
          colorCenterLine={0xffffff}
          colorGrid={0xffffff}
        />
        <ItemRenderer />
        <RayCaster camera={is2D ? camera2D : camera3D}/>
        <Cursor/>
        {/* <Effects/> */}
      </Canvas>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="absolute bottom-0 right-0 m-4 p-2"
              onClick={() => setIs2D(!is2D)}
            >
              {is2D ? <GlobeIcon size={24} /> : <GridIcon size={24} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{is2D ? "View 3D Perspective" : "View Top Down Perspective"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Editor3d;
