import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, removeTask, updateTask } = useContext(GlobalContext);

    const task = tasks.find(task => task.id === parseInt(id));

    const [showDeleteModal, setShowDeleteModal]= useState(false);
    const [showEditModal, setShowEditModal]= useState(false);

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
    const handleUpdate = async updatedTask => {
        try{
            await updateTask(updatedTask);
            setShowEditModal(false);
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
            <button onClick={() => setShowDeleteModal(true)} className="btn btn-secondary">Elimina Task</button>
            <button onClick={() => setShowEditModal(true)} className="btn btn-warning m-1">Modifica Task</button>
            <Modal
                title="Conferma"
                content={<p>Sei sicuro di voler eliminate la task</p>}
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                confirmText="Elimina"
            />
            <EditTaskModal
                task={task}
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSave={handleUpdate}
            />
        </div>
    )
}
