import {useSelector} from 'react-redux'
import {useEffect} from 'react'

const ItemPreview = ({position}) => {
  const currentAction = useSelector(state => state.currentAction);
  const currentModel = useSelector(state => state.currentModel)
  const [visibe, setVisible] = useState(false);
  const { GRID_SIZE } = useSelector((state) => state.editor);
  const midSize = Math.floor(GRID_SIZE / 2);
  const [model, setModel] = useState(<Loader />);
  const [data, setData] = useState("");
  const loader = new GLTFLoader();

  useEffect(()=>{
    if(currentAction === 'placeItem'){
      setVisible(true)
    }else{
      setVisible(false)
    }
  },[currentAction])
  useEffect(() => {
    async function getData() {
      loader.load(`/${currentModel}.glb`, (data) => setData(data));
    }
    getData();
  }, [currentModel]);
  useEffect(() => {
    if (data !== "") {
      setModel(
        <primitive
          object={data.scene}
          scale={[10, 10, 10]}
          position={[position.x - midSize, 0, position.y - midSize]}
        />
      );
    }
  }, [data]);
  return model;
}

export default ItemPreview