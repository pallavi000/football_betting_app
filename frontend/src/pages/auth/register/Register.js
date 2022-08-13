import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useDeviceDetect from '../../../hooks/useDeviceDetect'
import Desktop from './Desktop'
import Mobile from './Mobile'

function Register() {
    const {isMobile} = useDeviceDetect()
    const navigate = useNavigate()

    useEffect(()=>{
    if(localStorage.getItem('token')) {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        navigate('/dashboard')
      } catch (error) {
      }
    }
  },[])

  return (
    isMobile ? (
        <Mobile/>
            ):(
        <Desktop/>
            )
  )
}

export default Register