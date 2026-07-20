import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import TaskList from "./pages/TaskList"
import AddTask from "./pages/AddTask"
import { GlobalProvider } from "./context/GlobalContext"
import TaskDetail from "./pages/TaskDetail"

function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>
        <nav>
          <NavLink to="/">Task List</NavLink>
          <NavLink to="/addtask">Add Task</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<TaskList/>}/>
          <Route path="/addtask" element={<AddTask/>}/>
          <Route path="/task/:id" element={<TaskDetail/>}/>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
