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
import Effects from "./components/Effects";
import Cursor from "./components/Cursor";
import EditorOverlayButtons from "../EditorOverlayButtons";
import ItemPreview from "./components/ItemPreview";
import Sky from "./components/Sky";
import Island from "./components/Island";
import Screenshots from "./components/Screenshots";

const Editor3d = () => {
  const [is2D, setIs2D] = useState(true);
  const { GRID_SIZE, GRID_VISIBLE, COLOR_GRID, COLOR_CENTER_LINE } =
    useSelector((state) => state.grid);
  const currentAction = useSelector((state) => state.currentAction);
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
        gl={{
          preserveDrawingBuffer: true,
        }}
      >
        <OrbitControls enabled={true} enableRotate={currentAction === 'orbit' && !is2D} enableZoom={currentAction !== 'placeItem'}/>
        <Sky/>
        <Island/>
        {/* <Sky 
          distance={450000} 
          sunPosition={[3, 0, 7]} 
          inclination={50} 
          azimuth={180} 
          turbidity={10} 
          rayleigh={3} 
          mieCoefficient={.005}
          mieDirectionalG={.7}
        /> */}
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 500, 5]} intensity={1} />
        {/* <directionalLight position={[-2, 10, 2]} intensity={.2} /> */}
        <Ground size={GRID_SIZE} />
        {GRID_VISIBLE && (
          <Grid
            size={GRID_SIZE}
            colorCenterLine={COLOR_CENTER_LINE}
            colorGrid={COLOR_GRID}
          />
        )}
        <ItemRenderer />
        <RayCaster camera={is2D ? camera2D : camera3D} />
        <ItemPreview camera={is2D ? camera2D : camera3D} />
        <Cursor />
        {/* <Effects/> */}
        <Screenshots />
      </Canvas>
      <EditorOverlayButtons is2D={is2D} setIs2D={setIs2D} />
    </div>
  );
};

export default Editor3d;
