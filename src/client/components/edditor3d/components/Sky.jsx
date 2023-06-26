import { Suspense, useState, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Sky = () => {
  const [model, setModel] = useState(null);
  const [data, setData] = useState("");
  const loader = new GLTFLoader();
  useEffect(() => {
    async function getData() {
      loader.load(`/environment/Sky.glb`, (data) => setData(data));
    }
    getData();
  }, []);
  useEffect(() => {
    if (data !== "") {
      setModel(
        <primitive
          object={data.scene}
          scale={[2,2,2]}
        />
      );
    }
  }, [data]);

  return model;
}

export default Sky