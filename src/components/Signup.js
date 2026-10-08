
import { useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"", email: "", password: "",cpassword:""})
    let navigate= useNavigate()
    const handleSubmit = async (e) => {
      e.preventDefault()
      const {name,email,password}=credentials;
      const response = await fetch("http://localhost:5000/api/auth", {
        method: "POST",
        headers: {
          'content-Type': 'application/json',
        },
        body:JSON.stringify({name,email,password})
      });
      const json = await response.json()
      console.log(json)
      if(json.success){
        localStorage.setItem('token',json.authtoken)
        navigate('/')
        props.showAlert("Logged in successfully...","success")
      }
      else{
        props.showAlert("incorrect data...","danger")
      }
    }
    const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control"  onChange={onChange} id="name" name="name" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="passeord" className="form-label">Password</label>
            <input type="password" className="form-control" onChange={onChange} id="password" name="password" minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="cpasseord" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" onChange={onChange} id="cpassword" name="cpassword" minLength={5} required/>
          </div>
          <button type="submit" className="btn btn-primary">Sign=up</button>
          
        </form>
      </div>
    )
}

export default Signup
