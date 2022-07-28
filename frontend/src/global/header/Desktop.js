import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserById } from '../../pages/user/user_add_card/Action'

function Desktop() {
  const [user,setUser] = useState({})
  const token = localStorage.getItem('token')
  const[isAdmin,setIsAdmin]= useState(false)
  
useEffect(() => {
  if(token){
   getData()
    
  }

}, [])

async function getData(){
 var response = await getUserById()
 setUser(response.data)
 if(response.data.role=="admin"){
  setIsAdmin(true)
 }
}

 function logout(){  
  if(localStorage.getItem('token')){
      localStorage.removeItem('token')
      localStorage.removeItem('')
      
  }
}


  return (
    token?(
      <nav class=" card-nav navbar navbar-expand-lg ">
      <div class="container-fluid">
        <a class=" navbar-brand" href="/">Logo</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        {isAdmin?(
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="#">Dashboard</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/admin/card">Cards</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/admin/archived-card">Archive Cards</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/transaction">Payments</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/admin/team-list">Teams</Link>
            </li>
          </ul>
        ):(
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Dashboard</a>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/card">Cards</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/archived-card">Archive Cards</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/transaction">Payments</Link>
            </li>

          </ul>
        )}
    
          
          <form class="d-flex" role="search">
           <Link className='user-balance-section' to="/add-balance">
           <i class="fa-solid fa-user"></i>
            <div className='user-balance'>{user.balance}</div>
           </Link>
           <div className='user-profile'><i class="fa-solid fa-user"></i>
           <div class="btn-group  dropstart">
          <button class="btn btn-secondary btn-sm d-none" type="button">
           
          </button>
          <button type="button" class=" nav-drop btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul class="dropdown-menu">
          <li><a class="dropdown-item active" href="#" onClick={()=>logout()}>Logout</a></li>
    <li><Link class="dropdown-item" to="/profile">Profile</Link></li>
          </ul>
        </div>
           </div>
    
          </form>
        </div>
      </div>
    </nav>
    ):(
      <nav class="navbar navbar-expand-lg navbar-light desktop-nav">
      <a class="navbar-brand" href="#">Company Name</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse navbar-right logout-navbar" id="navbarNav">
        <ul class="navbar-nav">
          
          <li class="nav-item">
            <Link class="nav-link signin-nav" to="/login">Sign In</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link  signin-nav" to="/register">Sign Up</Link>
          </li>
        </ul>
      </div>
    </nav>
    )
   
  )
}

export default Desktop