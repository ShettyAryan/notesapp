import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from './pages/Home/Home'
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';


const routes =(
  <Router>
    <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path='/dashboard' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    </Routes>
  </Router>
)

const App = () => {
  return (
    <div>{routes}</div>
  )
}

export default App