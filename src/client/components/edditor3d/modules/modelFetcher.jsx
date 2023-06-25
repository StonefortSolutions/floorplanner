import axios from "axios";
import { Suspense, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Loader } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ModelFetcher = ({ name, position }) => {
  const { GRID_SIZE } = useSelector((state) => state.grid);
  const midSize = Math.floor(GRID_SIZE / 2);
  const [model, setModel] = useState(<Loader />);
  const [data, setData] = useState("");
  const loader = new GLTFLoader();
  useEffect(() => {
    async function getData() {
      loader.load(`/${name}.glb`, (data) => setData(data));
    }
    getData();
  }, []);
  useEffect(() => {
    if (data !== "") {
      setModel(
        <primitive
          object={data.scene}
          scale={[10, 10, 10]}
          position={[position.x, 1.5, position.y]}
        />
      );
    }
  }, [data]);
  return model;
};

export default ModelFetcher;
