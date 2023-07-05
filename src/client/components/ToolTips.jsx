import { useSelector } from "react-redux";

function ToolTips(){
  const currentAction = useSelector(state => state.currentAction)
  const wallFloorRoom = (
    <p>
      Click and Drag to add to Scene
    </p>
  )
  const orbit = (
    <>
      <p>Scroll to zoom</p>
      <p>Middle mouse to rotate</p>
      <p>Right mouse to pan</p>
    </>
  )
  const furniture = (
    <p>Click to place item</p>
  )
  const erase = (
    <p>click on an item to delete it</p>
  )
  const door = (
    <>
      <p>Select a Door</p>
      <p>Click on a wall to add a door</p>
    </>
  )

  return (
    <div className="">
      <h1 className=" font-extrabold text-3xl">HELP</h1>
      <div className="h-[10vh] rounded-md bg-secondary p-2">
        {
          currentAction === 'wall' || currentAction === 'floor' || currentAction === 'room'
          ? wallFloorRoom 
          : currentAction === 'orbit'
          ? orbit
          : currentAction === 'placeItem'
          ? furniture
          : currentAction === 'delete'
          ? erase
          : null
        }
      </div>
    </div>  
  )
}

export default ToolTips