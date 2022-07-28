import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { PasswordChange } from './Action'

function Mobile() {
  const[isLoading,setIsLoading] = useState(false)
    const[newPassword,setNewPassword] = useState('')
    const[confirmPassword,setConfirmPassword] = useState('')

    const navigate = useNavigate()

   async function handleSubmit(e){
        setIsLoading(true)
        e.preventDefault()
        const data={
            newpassword:newPassword,
            confirmpassword:confirmPassword
        }
       var response=  await PasswordChange(data)
       navigate(-1)
        setIsLoading(false)
    }
  return (
    <div className='mobile-card-section'>
        <div className='mobile-card'>
        <div className='d-flex align-items-center justify-content-between'>
        <div className='mobile-card-active'>Password Change</div>
        </div>
        <form onSubmit={(e)=>handleSubmit(e)}>
        
        
            <div className='active-card-section'>
          <div className=' mt-4'>
            <div className='add-home-team'>
              <input type="password"  placeholder="New Password" onChange={(e)=>setNewPassword(e.target.value)} required></input>
            </div>
            <div className='add-home-team'>
            <input type="password" placeholder='Confirm Password'  onChange={(e)=>setConfirmPassword(e.target.value)} required></input>
            </div>
          </div>
        </div>
        {isLoading?(
          <button className='mobile-submit-btn'>Updating</button>   

        ):(
          <button className='mobile-submit-btn'>Update</button>   
        )}

        </form>
        </div>
    </div>
  )
}

export default Mobile