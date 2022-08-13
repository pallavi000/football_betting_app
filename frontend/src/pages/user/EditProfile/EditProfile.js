import React, { useEffect, useState } from 'react'
import useDeviceDetect from '../../../hooks/useDeviceDetect'
import Mobile from './Mobile'
import Desktop from './Desktop'
import PageLoader from '../../Loader/PageLoader'
import { UpdateProfile } from './Action'
import { ProfileApi } from '../profile/Action'
import { useNavigate, useParams } from 'react-router-dom'

function EditProfile() {
  const {isMobile} = useDeviceDetect()
  const [isPageLoaded, setIsPageLoaded] = useState(false)


  const navigate = useNavigate()
    const params = useParams()

    const [isLoading, setIsLoading] = useState(false)
    const[user,setUser] = useState({
        name: '',
        phone: undefined,
        address: '',
        email: ''
    })

    useEffect(() => {
        if(localStorage.getItem('token')) {
            getData()
        }
    }, [])
  
   async function getData(){
     const response = await ProfileApi()
     if(response.data) {
         setUser({
            name: response.data.name,
            phone: response.data.phone,
            address: response.data.address,
            email: response.data.email
         })
     }
     setIsPageLoaded(true)
    }

    function handleChange(e) {
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }


    async function handleSubmit(e) {
        setIsLoading(true)
        e.preventDefault()
       await UpdateProfile(params.id, user)
        navigate(-1)
        setIsLoading(false)
    }


  return (
    !isPageLoaded ? (
      <PageLoader/>
    ):
    isMobile ? (
        <Mobile
          handleSubmit={handleSubmit}
          user={user}
          isLoading={isLoading}
          handleChange={handleChange}
        />
            ):(
        <Desktop
          handleSubmit={handleSubmit}
          user={user}
          isLoading={isLoading}
          handleChange={handleChange}
        />
  )
  )
}

export default EditProfile