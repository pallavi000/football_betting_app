import React, { useEffect, useState } from 'react'
import { ProfileApi } from '../profile/Action'
import { UpdateProfile } from './Action'
import {useNavigate, useParams} from 'react-router-dom'

function Mobile({handleSubmit, user, isLoading, handleChange}) {

    

  return (
    <div className='mobile-card-section'>
        <div className='mobile-card mobile-register-section'>
        <div className='d-flex align-items-center justify-content-between'>
        <div className='mobile-card-active'>Edit Profile</div>
        </div>
        <form onSubmit={(e)=>handleSubmit(e)}>
        
        
            <div className='active-card-section'>
          <div className=' mt-4'>
            <div className='add-home-team'>
              <label>Name</label>
              <input type="text" name='name' defaultValue={user.name} placeholder="Name" onChange={(e)=>handleChange(e)} required></input>
            </div>
            <div className='add-home-team'>
            <label>Email</label>
            <input type="email" defaultValue={user.email} placeholder='Email' readOnly></input>
            </div>
            <div className='add-home-team'>
            <label>Phone</label>
            <input type="text" name='phone' defaultValue={user.phone} placeholder='Phone' onChange={(e)=>handleChange(e)} required></input>
            </div>
            <div className='add-home-team'>
            <label>Address</label>
            <input type="text" name='address' defaultValue={user.address} placeholder='Address' onChange={(e)=>handleChange(e)} required></input>
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