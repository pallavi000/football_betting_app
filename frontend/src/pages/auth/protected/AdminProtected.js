import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import $ from 'jquery'

function AdminProtected(props) {
   const navigate = useNavigate()

   useEffect(() => {
    $('.content-section').css('max-width','900px')
    }, [])
   
    useEffect(()=>{
        if(localStorage.getItem('token')){
          try {
            var data = JSON.parse(localStorage.getItem('user'))
            console.log(data)
            if(data.role=="admin"){
             
            }else{
                navigate('/')
            }
          } catch (error) {
          }

        
          
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

export default AdminProtected