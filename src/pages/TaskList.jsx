import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"


function TaskList() {

    const {tasks} = useContext(GlobalContext);
    console.log('Tasks list:', tasks);

  return (
    <>
      <h1>Task List</h1>
    </>
  )
}

export default TaskList