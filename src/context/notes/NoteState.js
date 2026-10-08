import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesinitial = []
    const [notes, setNotes] = useState(notesinitial)

    const getNotes = async () => {
        const respose = await fetch(`${host}/api/note/fetchallnotes`, {
            method: "GET",
            headers: {
                'content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json=await respose.json()
        
        setNotes(json)
    }
    const addNote = async (tittle, description, tag) => {
        const date = new Date()
        const response = await fetch(`${host}/api/note/addnotes`, {
            method: "POST",
            headers: {
                'content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body:JSON.stringify({tittle,description,tag,date})
        });
        const json=await response.json()
        console.log("Adding a note",json)
    }
    const deleteNote = async (id) => {
        const respose = await fetch(`${host}/api/note/delete/${id}`, {
            method: "DELETE",
            headers: {
                'content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json=respose.json()
        console.log(json)
        console.log("deleting " + id)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }
    

    

    const editNote= async (id,tittle,description,tag)=>{
            const respose = await fetch(`${host}/api/note/updatenotes/${id}`, {
            method: "PUT",
            headers: {
                'content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body:JSON.stringify({tittle,description,tag})
        });
        const json=respose.json()
        console.log(json)

        let newNote= await JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if(element._id===id){
                newNote.tittle=tittle
                newNote.description=description
                newNote.tag=tag

            }
            break;
        }
        setNotes(newNote)
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote,getNotes,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState