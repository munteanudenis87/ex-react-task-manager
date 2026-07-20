import { useState, useRef } from "react";
import Modal from "./Modal";
import { Form } from "react-router-dom";

export default function EditTaskModal({ show, onClose, task, onSave }){
    const [editedTask, setEditedTask] = useState(task);
    const editFormRef = useRef();

    const changeEditedTask = (key, event) => {
        setEditedTask(prev => ({...prev, [key]: event.target.value}))
    }

    const { title, description, status } = editedTask;

    const handleSubmit = event => {
        event.preventDefault();
        onSave(editedTask);
    }

    return (
        <Modal
            title="Modifica Task"
            content={
                <form ref={editFormRef} onSubmit={handleSubmit}>
                    <label>
                        Nome Task:
                        <input
                            type='text'
                            value={title}
                            onChange={event => changeEditedTask('title', event)}
                        />
                    </label>
                    <label>
                        Descrizione:
                        <textarea
                            value={description}
                            onChange={event => changeEditedTask('description', event)}
                        />
                    </label>
                    <label>
                        Stato:
                        <select
                            value={status}
                            onChange={event => changeEditedTask('status', event)}
                        >
                                {["To do", "Doing", "Done"].map((value, index) => (<option key={index} value={value}>{value}</option>))}
                        </select>
                    </label>
                </form>
            }
            confirmText='Salva'
            show={show}
            onClose={onClose}
            onConfirm={() => editFormRef.current.requestSubmit()}
        />
    )

}

//  Creare il componente EditTaskModal.jsx:

//  Deve accettare i seguenti props:
//  show (boolean): determina se la modale è visibile.
//  onClose (function): funzione per chiudere la modale.
//  task (object): oggetto che rappresenta il task da modificare.
//  onSave (function): funzione che viene chiamata al salvataggio con il task aggiornato.
//  Utilizzare il componente Modal per creare la modale di modifica, passandogli i seguenti valori:
//  title: "Modifica Task".
//  content: un form contenente i campi del task da modificare.
//  confirmText: "Salva".
//  onConfirm: deve attivare il submit del form.

//  💡 Importante:
//  Per attivare il submit del form, dobbiamo ottenere un riferimento diretto al form all'interno del componente. Creiamo una ref con useRef() e associamola al form.
//  Questo ci permette di chiamare il metodo editFormRef.current.requestSubmit() quando l'utente clicca su "Salva" nella modale, simulando il comportamento di un normale submit.

//  Strutturare il form all'interno della modale, includendo i seguenti campi:
//  Nome (title) → Input di testo controllato (useState).
//  Descrizione (description) → Textarea controllata (useState).
//  Stato (status) → Select controllata (useState) con opzioni "To do", "Doing", "Done".
//  L'onSubmit del form deve eseguire onSave, passandogli la task modificata