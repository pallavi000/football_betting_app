import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addTeam } from './Action'

function Desktop() {
    const[isLoading,setIsLoading]= useState(false)
    const[name,setName] = useState('')
    const[nickname,setNickname] = useState('')
    const[image,setImage] = useState('')

    const navigate = useNavigate()

  async  function handleSubmit(e){
        e.preventDefault()
        const data= new FormData()
        data.append('name',name)
        data.append('nickname',nickname)
        data.append('image',image)

        const response = await addTeam(data)
        console.log(response.data)
        navigate(-1)
    }

  return (
    <div className='add-card-section'>
    <div className='add-card-title'>Add New Team</div>
    <div className='add-card-form'>
        <form onSubmit={(e)=>handleSubmit(e)}>
                <div className='form-group'>
                <label>Team Name</label>
                <input className='form-control'  type="text" onChange={(e)=>setName(e.target.value)} required></input>
                </div>
            <div className='form-group'>
                <label>Team Sort Name</label>
                <input className='form-control'  type="text" onChange={(e)=>setNickname(e.target.value)} required></input>
            </div>

            <div className='form-group'>
                <label>Image</label>
                <input className='form-control'  type="file" onChange={(e)=>setImage(e.target.files[0])} required></input>
            </div>
        {isLoading?(
          <button className='btn-add-card'>Submitting... <i class="fa-solid fa-arrow-right"></i></button>
        ):(
          <button className='btn-add-card' type="submit">Submit<i class="fa-solid fa-arrow-right"></i></button>
        )}
        </form>
    </div>
</div>
  )
}

export default Desktop