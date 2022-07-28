import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import $ from 'jquery'

function UserProtected(props) {
   const navigate = useNavigate()

   useEffect(() => {
    $('.content-section').css('max-width','900px')
    }, [])

   async function getUser() {

   }
   
    useEffect(()=>{
        if(localStorage.getItem('token')){
          try {
            var token = localStorage.getItem('token')
            var user = JSON.parse(localStorage.getItem('user'))
            if(token){
             
            }
          } catch (error) {
          }

          getUser()
          
        }else{
            navigate('/')
        }

    },[props])
  return (
    <>

        <Outlet/>
    </>
  )
}

export default UserProtected