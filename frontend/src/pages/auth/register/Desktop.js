import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import image from '../../../images/login.png'
import { RegisterApi } from './Action'
import $ from 'jquery'

function Desktop() {
    const[name,setName] = useState('')
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[isLoader,setIsLoader] = useState(false)

    useEffect(() => {
        $('.content-section').css('max-width','100%')
        }, [])

async function register(e){
    setIsLoader(true)
    e.preventDefault()
   const response = await RegisterApi(name,email,password)
   if(response.status=="success"){
        setIsLoader(false)
   }else{
        setIsLoader(false)
   }
}

  return (
    <div className='login-section'>
    <div className='row'>
       <div className='col-md-6 login-image-section'>
       <div className='login-image'>
        <img src={image} className="img-fluid"/>
        <div className='welcome'>
        Welcome Back
        <span>Just a couple of clicks and we start</span>
        </div>
       </div>
       </div>
       <div className='col-md-6 login-form-section'>
           <form onSubmit={(e)=>register(e)}>
           <div className='login-title' >Sign Up</div>
           <div className='form-group'>
            <label>Name</label>
            <input type="name" placeholder='Enter name' onChange={(e)=>setName(e.target.value)} required ></input>
           </div>
           <div className='form-group'>
            <label>Email</label>
            <input type="email" placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)} required></input>
           </div>

           <div className='form-group'>
            <label>Password</label>
            <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} required></input>
           </div>
            {isLoader?(
                <button className='login-btn' disabled>Submitting</button>

            ):(
                <button className='login-btn'>Submit</button>

            )}
            <div className='new-account'>Already a member ? <Link to="/login">Sign In</Link></div>
           </form>
       </div>
       </div>
    </div>
  )
}

export default Desktop