import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function TaskDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, removeTask } = useContext(GlobalContext);

    const task = tasks.find(task => task.id === parseInt(id));
    if(!task){
        return(
            <h2>Task non trovata</h2>
        )
    }
    const handleDelete = async () => {
        try{
            await removeTask(task.id);
            alert("Task eliminata!");
            navigate("/");
        }catch(error){
            console.error(error);
            alert(error.message);
        }
    }
    return(
        <div className="dettaglio-task">
            <h1>Dettaglio Task</h1>
            <h2>Nome: {task.title}</h2>
            <p>Descrizione: {task.description}</p>
            <p>Stato: {task.status}</p>
            <p>Data di creazione: {new Date(task.createdAt).toLocaleDateString()}</p>
            <button onClick={handleDelete} className="btn btn-secondary">Elimina Task</button>
        </div>
    )
}
