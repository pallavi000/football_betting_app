import React, { useState } from 'react'
import image from '../../../images/card.png'
import { LoginApi } from './Action'

function Mobile() {
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const[isLoading,setIsLoading] = useState(false)

 async function login(e){
  setIsLoading(true)
    e.preventDefault()
 
     const response = await LoginApi(email,password)
     setIsLoading(false)
     if(response.status=="success"){
      window.location.href="/"
     }else{
     }
  }

  return (
    <div className='mobile-login-section'>
    <div className='mobile-image'>
      <img src={image} className="img-fluid"></img>
    </div>
      <div className='login-card'>
      <form onSubmit={(e)=>login(e)}>
        <div className='login-card-title'>Welcome</div>
        <div className='mobile-form-group'>
          <input type="email" placeholder='email' onChange={(e)=>setEmail(e.target.value)}></input>
        </div>
        <div className='mobile-form-group'>
          <input type="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)}></input>
        </div>
       <div className='d-flex justify-content-between align-items-center'>
          <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
          <label class="form-check-label" for="flexCheckDefault">
            Reminder me
          </label>
        </div>
      <div className='mobile-forgot-password'>Forgot Password</div>
    </div>
        {isLoading?(
          <button type="submit" className='mobile-submit-btn'>Signing</button>  
        ):(
          <button type="submit" className='mobile-submit-btn'>Sign In</button>  
        )}
         </form> 
         <div className='mobile-new-account'>Don’t have account? <span>Sign Up</span></div>
      </div>
    </div>
  )
}

export default Mobile