import React from 'react'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'
import PasswordInput from '../../components/PasswordInput'
import { validateEmail } from '../../utils/helper'

const Login = () => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(null);

const handleLogin = async (e)=>{
e.preventDefault();

if (!validateEmail(email)){
  setError("Please enter a valid email address.");
  return;
}

if (!password){
  setError("Please enter the password.");
  return;
}

setError("")
}


  return (
    <>
    <Navbar />

    <div className='flex items-center justify-center mt-28'>
      <div className='w-96 border border-slate-400 rounded px-7 py-10 bg-white '>
        <form onSubmit={handleLogin}>
          <h4 className='text-2xl mb-7'>Login</h4>
          <input type="text" name="" id="" placeholder='Email' className='input-box' value={email} onChange={(e)=>setEmail(e.target.value)}/>

          <PasswordInput  value={password} onChange={(e)=>setPassword(e.target.value)} />    

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}  

          <button type='submit' className='btn-primary'>Login</button>
          <p className='text-sm text-center mt-4'> Not Registered yet?{" "} 
            <Link to="/signup" className='font-medium text-primary underline'>
            Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login