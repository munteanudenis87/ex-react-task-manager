import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import TaskList from "./pages/TaskList"
import AddTask from "./pages/AddTask"

function App() {

  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/">Task List</NavLink>
        <NavLink to="/addtask">Add Task</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<TaskList/>}/>
        <Route path="/addtask" element={<AddTask/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
