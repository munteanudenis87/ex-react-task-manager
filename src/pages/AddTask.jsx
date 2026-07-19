import { useState, useRef, useMemo, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";


function AddTask() {
  const { addTask } = useContext(GlobalContext);

  const [taskTitle, settaskTitle] = useState("");
  const descrizioneRef = useRef();
  const statoRef = useRef();

  const taskTitleEr= useMemo(() => {
    if(!taskTitle.trim()) 
      return "Nome task non può essere vuoto."
    if([...taskTitle].some(char => symbols.includes(char)))
      return "Nome task non può contenere simboli speciali."
    return "";
  }, [taskTitle]);

  const handleSubmit = async event => {
    event.preventDefault();
    if(taskTitleEr)
      return;

    const newTask = {
      title: taskTitle.trim(),
      description: descrizioneRef.current.value,
      status: statoRef.current.value
    }
    try{
      await addTask(newTask);
      alert("Task creata");
      settaskTitle("");
      descrizioneRef.current.value ="";
      statoRef.current.value = "";
    }catch(error){
        alert(error.message);
    }
  }

  return (
    <>
      <h1>Add Task</h1>
      <form onSubmit={handleSubmit}>
        <label className="form-label">
          Nome del task:
          <input
            type="text"
            value={taskTitle}
            onChange={event => settaskTitle(event.target.value)}
          />
        </label>
        {taskTitleEr &&
          <p style={{color: 'red'}}>{taskTitleEr}</p>
        }
        <label className="form-label">
          Descrizione:
          <textarea ref={descrizioneRef}/>
        </label>
        <label className="form-label">
          Stato:
          <select ref={statoRef}>
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </label>
        <div><button type="submit" className="btn btn-primary">Aggiungi Task</button></div>
      </form>
    </>
  )
}

export default AddTask