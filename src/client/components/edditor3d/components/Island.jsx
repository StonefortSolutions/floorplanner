import { Suspense, useState, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Island = () => {
  const [model, setModel] = useState(null);
  const [data, setData] = useState("");
  const loader = new GLTFLoader();
  useEffect(() => {
    async function getData() {
      loader.load(`/environment/Island.glb`, (data) => setData(data));
    }
    getData();
  }, []);
  useEffect(() => {
    if (data !== "") {
      setModel(
        <primitive
          object={data.scene}
          position = {[0,-2,0]}
          scale ={[6,6,6]}
        />
      );
    }
  }, [data]);

  return model;
}

export default Island