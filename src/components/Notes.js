import  { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitemss from './Noteitemss';
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  let navigate=useNavigate()
  const {showAlert}=props
  const context = useContext(noteContext)
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    }
    else{
      navigate('/login')
    }
  },[])
  const ref = useRef(null)
  const refClose=useRef(null)
  const [note, setNotes] = useState({ etittle: "", edescription: "", etag: "" })
  const updateNote = (currentNote) => {
    ref.current.click()
    setNotes({id:currentNote._id,etittle:currentNote.tittle,edescription:currentNote.description,etag:currentNote.tag})
    console.log(ref.current)

  }
  const handleClick = (e) => {
    console.log("Updating notes",note)
    editNote(note.id,note.etittle,note.edescription,note.etag)
    .then(()=> getNotes())
    //window.location.reload(true); // Deprecated, but used to bypass cache
    refClose.current.click()
    props.showAlert("Notes updated successfully...","success")
  }
  const onchange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <AddNotes showAlert={showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h2>Edit Your Notes</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="etittle" className="form-label">Tittle</label>
                  <input type="text" className="form-control" id="etittle" name='etittle' aria-describedby="emailHelp" value={note.etittle} onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onchange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleClick} type="button" className="btn-btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <Noteitemss key={note._id} updateNote={updateNote} showAlert={showAlert} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes
