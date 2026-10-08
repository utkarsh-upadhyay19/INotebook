//import logo from './logo.svg';
import './App.css';
import {Route,Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import About from './components/About';
//import { useLocation } from 'react-router-dom';
import Front from './components/Front';
import NoteState from './context/notes/NoteState';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import ReadMore from './components/ReadMore';
function App() {
      const[alert,setAlert]=useState()
  
    const showAlert=(message,type)=>{
      setAlert({
        msg:message,
        type:type
      })
      setTimeout(() => {
        showAlert(null)
      }, 5000);
    }
  return (
    
    
      <NoteState>
      <Navbar/>
      <div className="container ">
        
        <Alert alert={alert}/>
      <Routes>
        <Route path='/'element={<Front showAlert={showAlert}/>}/>
        <Route path='/about'element={<About showAlert={showAlert}/>}/>
        <Route path='/read'element={<ReadMore/>}/>
        <Route path='/login'element={<Login showAlert={showAlert}/>}/>
        <Route path='/signup'element={<Signup showAlert={showAlert}/>}/>
      </Routes>
      </div>
      
      </NoteState>
    
  );
}

export default App;
