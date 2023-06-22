import axios from 'axios'
import {Suspense, useState, useEffect} from 'react'
import {Loader} from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const ModelFetcher = ({name, position}) => {
  const [model, setModel] = useState((<Loader/>))
  const [data, setData] = useState('')
  const loader = new GLTFLoader()
  useEffect(()=>{
    async function getData(){
      loader.load(`/${name}.glb`, data => setData(data))
    }
    getData()
  },[])
  console.log(position)
  useEffect(()=>{
    if(data !== ''){
      console.log(data);
      setModel((
        <primitive object={data.scene} scale={[10,10,10]} position={[position.x - 25,0, position.y - 25]}/>
      ));
    }
  },[data])
  return model
}

export default ModelFetcher