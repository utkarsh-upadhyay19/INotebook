import  { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Noteitemss = (props) => {
    let navigate=useNavigate()
    const context=useContext(noteContext)
    const {deleteNote}=context
    const { note,updateNote } = props;

    const handleRead=()=>{
        navigate('/read', { state: { note } })
    }
       
    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                    <div className="card-body">
                        <h5 className="card-title">{note.tittle}</h5>
                        <p className="card-text">{note.description.slice(0, 10)}...</p>
                        <div className="btns">
                        <button onClick={handleRead} className="btnn-btn-primary" >ReadMore</button>
                        <i className="fa-solid fa-trash-can" onClick={()=>{deleteNote(note._id);props.showAlert("Notes deleted successfully...","success")}}></i>
                        <i className="fa-regular fa-pen-to-square"onClick={()=>{updateNote(note)}}></i>
                        </div>
                        <div className="mt-2"><small>Added on: {new Date(note.date).toLocaleDateString()}</small></div>

                    </div>
            </div>
        </div>
    )
}

export default Noteitemss