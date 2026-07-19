import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow"


function TaskList() {

    const {tasks} = useContext(GlobalContext);
    console.log('Tasks list:', tasks);

  return (
    <>
      <h1>Task List</h1>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Nome</th>
            <th>Stato</th>
            <th>Data di Creazione</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (<TaskRow key={task.id} task={task}/>))}
        </tbody>
      </table>
    </>
  )
}

export default TaskList