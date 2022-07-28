import React, { useEffect, useState } from 'react'
import { ProfileApi } from './Action'
import {Link} from 'react-router-dom'

function Desktop() {
  const[user,setUser] = useState({})
  useEffect(() => {
    getData()
  }, [])

 async function getData(){
   const response = await ProfileApi()
   setUser(response.data)

  }
  
  return (
    <div className='week-card-section'>
    <div className='active-card-section'>
          <div className='active-card-title'>Profile</div>
          <div  className='active-card d-block' >
          <div className='mx-auto w-50'>
          <div className='profile-row'>
            <div className='profile-name'>Name:</div>
            <div className='profile-value'>{user.name}</div>
          </div>

          <div className='profile-row'>
            <div className='profile-name'>Email:</div>
            <div className='profile-value'>{user.email}</div>
          </div>

          <div className='profile-row '>
            <div className='profile-name'>Balance:</div>
            <div className='profile-value'>${user.balance}</div>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='col mr-4' style={{marginRight:'2rem'}}>
          <Link className='btn-add-card profile-btn' to="/change-password">Change Password</Link>
          </div>
          <div className='col'>
          <Link className='btn-add-card profile-btn' to="/add-balance">Add Balance</Link>
          </div>
        </div>

        </div>
      </div>
    </div>
  )
}

export default Desktop