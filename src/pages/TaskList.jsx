import { useCallback, useContext, useMemo, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow"

// Funzione di debaunce
function debaunce(callback, delay){
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay)
  }
}

function TaskList() {

  const {tasks} = useContext(GlobalContext);
    console.log('Tasks list:', tasks);

  const [searchQuery, setSearchQuery] = useState("");
  const debounceSearch = useCallback(
    debaunce(setSearchQuery, 500), []);

  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState(1);

  const sortIcon = sortOrder === 1 ? "↓" : "↑";
  
  const handleSort = (field) => {
    if(sortBy === field){
      setSortOrder(prev => prev * -1);
    }else{
      setSortBy(field);
      setSortOrder(1);
    }
  }

  const filteredAndSortedTask = useMemo(() => {
    return [...tasks]
    .filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      let compare;
      if(sortBy === 'title'){
        compare = a.title.localeCompare(b.title)
      }else if(sortBy === 'status'){
        const statusOptions = ["To do", " Doing", "Done"];
        compare = statusOptions.indexOf(a.status) - statusOptions.indexOf(b.status);
      }else if(sortBy === 'createdAt'){
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          compare = dateA - dateB;
      }
      return compare * sortOrder;
    });
  }, [ tasks, sortBy, sortOrder, searchQuery ]);

  return (
    <>
      <h1>Task List</h1>
      <input
        type="text"
        placeholder="Cerca"
        onChange={event => debounceSearch(event.target.value)}
      />
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th onClick={() => handleSort('title')}>
              Nome {sortBy === "title" && sortIcon}
            </th>
            <th  onClick={() => handleSort('status')}>
              Stato {sortBy === "status" && sortIcon}
            </th>
            <th  onClick={() => handleSort('createdAt')}>
              Data di Creazione {sortBy === "createdAt" && sortIcon}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedTask.map(task => (<TaskRow key={task.id} task={task}/>))}
        </tbody>
      </table>
    </>
  )
}

export default TaskList