import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Ground from "./components/Ground";
import Grid from "./components/Grid";
import * as THREE from "three";
import { useDispatch, useSelector } from "react-redux";
import ItemRenderer from "./components/ItemRenderer";
import Effects from "./components/Effects";
import EditorOverlayButtons from "../EditorOverlayButtons";
import Sky from "./components/Sky";
import Island from "./components/Island";
import Screenshots from "./components/Screenshots";
import WallRayCaster from "./components/RayCasters/WallRayCaster";
import FloorRayCaster from "./components/RayCasters/FloorRaycaster";
import RoomRayCaster from "./components/RayCasters/RoomRaycaster";
import ItemRayCaster from "./components/RayCasters/ItemRayCaster";
import DoorRayCaster from "./components/RayCasters/DoorRaycaster";
import EditRaycaster from "./components/RayCasters/EditRaycaster";
import Controls from "./components/Controls";
import { fetchSingleFloorplan } from "../../store/floorplan";
import { useNavigate } from "react-router-dom";
import { setLoadFloorplanError } from "../../store";
import {FirstPersonControls} from "@react-three/drei"
import { Skeleton } from "../ui/Skeleton";

const Editor3d = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loadFloorplanError, loadedFloorplan } = useSelector(
    (state) => state.errors
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleFloorplan(id));
    }
  }, [id]);

  //State
  const [is2D, setIs2D] = useState(true);
  //Selectors
  const { GRID_SIZE, GRID_VISIBLE, COLOR_GRID, COLOR_CENTER_LINE } =
    useSelector((state) => state.grid);
  const currentAction = useSelector((state) => state.currentAction);

  const camera2D = new THREE.OrthographicCamera(-50, 50, -50, 50, 0.1, 100);
  camera2D.translateY(50);
  camera2D.zoom = 11.6;
  const camera3D = new THREE.PerspectiveCamera(75, 50 / 50, 0.1, 1000);
  camera3D.translateY(50);
  camera3D.translateZ(50);

  useEffect(() => {
    const canvas = document.getElementById("canvas1");
    if (!canvas) return;
    canvas.onpointerup = null;
    canvas.onpointerdown = null;
    canvas.onpointermove = null;
    canvas.onclick = null;
    if(currentAction === 'firstPerson'){
      canvas.requestPointerLock({unadjustedMovement: true,})
    }
  }, [currentAction]);

  const currentCursor =
    currentAction === "placeItem"
      ? "cursor-grabbing"
      : currentAction === "orbit" && !is2D
      ? "cursor-move"
      : currentAction === "orbit" && is2D
      ? "cursor-default"
      : currentAction === "delete"
      ? "cursor-pointer"
      : "cursor-crosshair";

  //when loadFloorplanError is true, navigate to /dashboard
  useEffect(() => {
    if (loadFloorplanError === true) {
      navigate("/dashboard");
    }
  }, [loadFloorplanError]);

  return loadedFloorplan ? (
    <div
      id="edditor"
      className={`leading-none h-[90%] md:h-[98%] relative ${currentCursor}`}
    >
      <Canvas
        id="canvas1"
        camera={is2D ? camera2D : camera3D}
        className="border-8 border-primary-forground"
        frameloop={currentAction === "firstPerson" ? "always" : "demand"}
        gl={{
          preserveDrawingBuffer: true,
        }}
      >
        {currentAction !== "firstPerson" && <Controls is2D={is2D} camera={is2D ? camera2D : camera3D}/>}
        <Sky />
        <Island />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 500, 5]} intensity={0.7} />
        <Ground size={GRID_SIZE} />
        {GRID_VISIBLE && (
          <Grid
            size={GRID_SIZE}
            colorCenterLine={COLOR_CENTER_LINE}
            colorGrid={COLOR_GRID}
          />
        )}
        <ItemRenderer />
        {currentAction === "wall" ? (
          <WallRayCaster camera={is2D ? camera2D : camera3D} />
        ) : currentAction === "floor" ? (
          <FloorRayCaster camera={is2D ? camera2D : camera3D} />
        ) : currentAction === "room" ? (
          <RoomRayCaster camera={is2D ? camera2D : camera3D} />
        ) : currentAction === "placeItem" ? (
          <ItemRayCaster camera={is2D ? camera2D : camera3D} />
        ) : currentAction === "door" ? (
          <DoorRayCaster camera={is2D ? camera2D : camera3D} />
        ) : currentAction === "edit" ? (
          <EditRaycaster camera={is2D ? camera2D : camera3D} />
        ) : currentAction === "firstPerson" ? (
          <FirstPersonControls 
            camera={camera3D} 
            lookSpeed={.25}
            position={[0,4,0]}
          />
        ) : null}
        {/* <Effects/> */}
        <Screenshots />
      </Canvas>
      <EditorOverlayButtons is2D={is2D} setIs2D={setIs2D} />
    </div>
  ) : (
    <Skeleton className=" h-[90%] md:h-[98%]" />
  );
};

export default Editor3d;
