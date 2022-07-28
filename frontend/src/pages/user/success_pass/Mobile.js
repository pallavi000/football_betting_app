import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import success from '../../../images/success.png'
import { getUserById } from '../user_add_card/Action'

function Mobile() {
  const[user,setUser] = useState({})

useEffect(() => {
getData()
}, [])


async function getData(){
  const response = await getUserById()
  setUser(response.data)
}
  return (
    <div className='success-section'>
        <div className='success-title'>Success</div>
        <div className='success-detail'>Your transaction  {user.balance} has been successfully. We’ve send details in your email. You can use your balance to bet on our site.</div>
        <div className='success-image text-center'>
            <img src={success} className="img-fluid"/>
        </div>

        <Link to="/" className='mobile-submit-btn mb-5'>Back to Home</Link>   

    </div>
  )
}

export default Mobile