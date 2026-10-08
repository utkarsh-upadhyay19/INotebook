import  { useContext, useEffect } from 'react'
import { useState } from 'react';
import noteContext from '../context/notes/noteContext';


const AddNotes = (props) => {
  const context = useContext(noteContext)
  const { addNote,getNotes } = context;
  const [note, setNotes] = useState({ tittle: "", description: "", tag: "" })
  const [email,setEmail]=useState("")
  
useEffect(() => {
  localStorage.setItem('tittle', note.tittle);
  localStorage.setItem('description', note.description);
}, [note]);
  const onchange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value })
  }
  const handleClick = (e) => {
    e.preventDefault()
    const adddate = new Date()

    addNote(note.tittle, note.description, note.tag,adddate)
    .then(()=> getNotes())
    props.showAlert("notes addes successfully..","success")
  }
  useEffect(()=>{
    const stored=localStorage.getItem('email')
    setEmail(stored)
  },[])
  return (
    <>
    
    <div class="d-flex justify-content-end p-2"style={{position: 'absolute',
    top: '10%',     // pushes it down
    right: '0%',}}>
        <div class="accordion " id="accordionExample"  style={{ width: '10%'}}>
          <div class="accordion-item"style={{border:'none'}}>
            <h2 class="accordion-header">
              <div class="d-flex justify-content-end p-2">
                <button class="accordion-button w-auto" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  <b>PROFILE</b>
                </button>
              </div>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse " data-bs-parent="#accordionExample" >
              <div class="accordion-body d-flex flex-column align-items-end p-1 style=border-bottom: none; box-shadow: none;">
                <strong><p>{email}</p></strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div className='container '>
      <h2>Add Notes</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="tittle" className="form-label">Tittle</label>
          <input type="text" className="form-control" id="tittle" name='tittle' aria-describedby="emailHelp" onChange={onchange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" name='description' onChange={onchange}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' onChange={onchange} />
        </div>
        <button type="submit" className="btn-custom-btn" onClick={handleClick}>Add Note</button>
      </form>
    </div>
    
    </>
  )
}

export default AddNotes
