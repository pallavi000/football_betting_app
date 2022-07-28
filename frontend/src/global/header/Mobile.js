import React, { useEffect, useState } from 'react'
import chart from '../../images/Chart.png'
import profile from '../../images/Profile.png'
import dis from '../../images/Discovery.png'
import home from '../../images/home1.png'
import {Link} from 'react-router-dom'
import { getUserById } from '../../pages/user/user_add_card/Action'

function Mobile() {
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
   <div className='mobile-header'>
   {isAdmin?(
      <>
      <Link className='home-icom' to="/"><img src={home}/></Link>
    <Link className='home-icom' to="/admin/card"><img src={dis} /></Link>
    <Link className='home-icom' to="/payment"><img src={chart}/></Link>
    <Link className='home-icom' to="/profile"><img src={profile}/></Link>
      </>
   ):(
<>
<Link className='home-icom' to="/card"><img src={home}/></Link>
    <Link className='home-icom' to="/card"><img src={dis} /></Link>
    <Link className='home-icom' to="/transaction"><img src={chart}/></Link>
    <Link className='home-icom' to="/profile"><img src={profile}/></Link>
</>
   )}

   </div>
  )
}
export default Mobile
