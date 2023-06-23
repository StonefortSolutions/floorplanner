import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Ground from "./components/Ground";
import Grid from "./components/Grid";
import SnapPoints from "./components/SnapPoints";
import * as THREE from "three";
import { useDispatch, useSelector } from "react-redux";
import { loadScene } from "../../store/scene";
import RayCaster from "./components/RayCaster";
import ItemRenderer from "./components/ItemRenderer";

import Effects from "./components/Effects";
import modelFetcher from "./modules/modelFetcher";
import EditorOverlayButtons from "../EditorOverlayButtons";

const Editor3d = () => {
  const [is2D, setIs2D] = useState(true);
  const { GRID_SIZE, GRID_VISIBLE, COLOR_GRID, COLOR_CENTER_LINE } =
    useSelector((state) => state.grid);
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
        {GRID_VISIBLE && (
          <Grid
            size={GRID_SIZE}
            colorCenterLine={COLOR_CENTER_LINE}
            colorGrid={COLOR_GRID}
          />
        )}
        <SnapPoints size={GRID_SIZE} />
        <ItemRenderer />
        {/* <Effects/> */}
      </Canvas>
      <EditorOverlayButtons is2D={is2D} setIs2D={setIs2D} />
    </div>
  );
};

export default Editor3d;
