import React, { useEffect, useState } from 'react'
import profile from '../../../images/login.png'
import { ProfileApi } from './Action'
import {Link} from 'react-router-dom'

function Mobile() {
    const[user,setUser] = useState({})
    useEffect(() => {
      getData()
    }, [])
  
   async function getData(){
     const response = await ProfileApi()
     setUser(response.data)
  
    }
    
  return (
    <div className='profile-section'>
        <div className='profile-image'>
            <img src={profile} className="img-fluid"/>
            <div className='profile-edit-icon'><i class="fa-solid fa-pencil"></i></div>
        </div>
        <div className='profile-name'>{user.name}</div>
        <div className='profile-card-detail d-flex align-items-center'>
            <div className='profile-card-icon'>
            <i class="fa-regular fa-user"></i>
            </div>
            <div className='profile-card-name'>
                <div className='user-name'>Name</div>
                <div className='profile-value'>{user.name}</div>
            </div>
        </div>

        

        <div className='profile-card-detail d-flex align-items-center'>
            <div className='profile-card-icon'>
            <i class="fa-regular fa-user"></i>
            </div>
            <div className='profile-card-name'>
                <div className='user-name'>Email</div>
                <div className='profile-value'>{user.email}</div>
            </div>
        </div>

        <div className='profile-card-detail d-flex align-items-center'>
            <div className='profile-card-icon'>
            <i class="fa-regular fa-user"></i>
            </div>
            <div className='profile-card-name'>
                <div className='user-name'>Phone</div>
                <div className='profile-value'>9844677282</div>
            </div>
        </div>

        <div className='profile-card-detail d-flex align-items-center'>
            <div className='profile-card-icon'>
            <i class="fa-regular fa-user"></i>
            </div>
            <div className='profile-card-name'>
                <div className='user-name'>Address</div>
                <div className='profile-value'>Long beach, California</div>
            </div>
        </div>

        <div className='profile-card-detail d-flex align-items-center'>
            <div className='profile-card-icon'>
            <i class="fa-regular fa-user"></i>
            </div>
            <div className='profile-card-name'>
                <div className='user-name'>My Balance</div>
                <div className='profile-value d-flex align-items-center justify-content-between'>${user.balance} <Link className='text-white position-relative' to="/add-balance"><i class="fa-solid fa-pencil position-relative text-white"></i></Link></div>
            </div>
        </div>

        <Link to="/change-password" className='mobile-submit-btn' >Edit Profile</Link>   

    </div>
  )
}

export default Mobile