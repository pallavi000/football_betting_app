import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addTeam } from './Action'

function Mobile({handleSubmit, setNickname, setName, setImage, isLoading}) {
  

  return (
    <div className='mobile-register-section h-100'>
        <div className='login-card-title'>Welcome</div>
        <form className='active-card-section h-100' onSubmit={(e)=>handleSubmit(e)}>
                <div className='mobile-form-group'>
                <label>Team Name</label>
                <input  type="text" placeholder='i.e. Chelsea' onChange={(e)=>setName(e.target.value)} required></input>
                </div>
            <div className='mobile-form-group'>
                <label>Team Short Name</label>
                <input  type="text" placeholder='i.e. CHE' onChange={(e)=>setNickname(e.target.value)} required></input>
            </div>

            <div className='mobile-form-group'>
                <label>Image</label>
                <input  type="file" onChange={(e)=>setImage(e.target.files[0])} required></input>
            </div>
        {isLoading?(
          <button className='mobile-submit-btn'>Submitting...</button>
        ):(
          <button className='mobile-submit-btn' type="submit">Submit</button>
        )}
        </form> 
      </div>
  )
}

export default Mobile