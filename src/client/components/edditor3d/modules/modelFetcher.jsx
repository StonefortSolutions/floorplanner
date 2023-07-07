import { useState, useEffect } from "react";
import { Loader } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ModelFetcher = ({ name, position, rotation }) => {
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
          scale={[5, 5, 5]}
          position={[position.x, 0.5, position.y]}
          rotation={rotation}
        />
      );
    }
  }, [data]);
  if (data === "") return null;
  return model;
};

export default ModelFetcher;
