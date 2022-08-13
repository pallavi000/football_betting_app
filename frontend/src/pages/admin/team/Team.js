import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useDeviceDetect from '../../../hooks/useDeviceDetect'
import { addTeam } from './Action'
import Desktop from './Desktop'
import Mobile from './Mobile'

function Team() {
    const {isMobile} = useDeviceDetect()

    const[isLoading,setIsLoading]= useState(false)
    const[name,setName] = useState('')
    const[nickname,setNickname] = useState('')
    const[image,setImage] = useState('')

    const navigate = useNavigate()

  async function handleSubmit(e){
        e.preventDefault()
        setIsLoading(true)
        const data= new FormData()
        data.append('name',name)
        data.append('nickname',nickname)
        data.append('image',image)
        const response = await addTeam(data)
        setIsLoading(false)
        navigate(-1)
    }
    
  return (
    isMobile ? (
        <Mobile
        handleSubmit={handleSubmit}
        setNickname={setNickname}
        setName={setName}
        setImage={setImage}
        isLoading={isLoading}
        />
            ):(
        <Desktop
          handleSubmit={handleSubmit}
        setNickname={setNickname}
        setName={setName}
        setImage={setImage}
        isLoading={isLoading}
        />
  )
  )
}

export default Team