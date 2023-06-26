import {useSelector} from 'react-redux'
import ColorPicker from './ColorPicker';
import ModelSelector from './ModelSelector'

const RightSideBar = () => {
  const currentAction = useSelector(state=>state.currentAction);
  return(
    <div className='lg:w-[500px] lg:h-[700px]'>
      {currentAction === 'placeItem' && (<ModelSelector/>)}
      {(currentAction === 'wall' || currentAction === 'room' || currentAction === 'floor') && (<ColorPicker/>)}
    </div>
  )
}

export default RightSideBar