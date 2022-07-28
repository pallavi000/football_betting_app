import React from 'react'
import { Link } from 'react-router-dom'
import img from '../../../images/success-icon.png'

function Desktop() {
  return (
    <div className='week-card-section success-section'>
    <div className='active-card-section'>
    <div className='success-container'>
    <div className='active-card-title'>Yes, you’ve added amount to your balance!</div>
          <div className='desktop-success-detail'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</div>
          <div  className='active-card d-block' >
        
            <div className='success-image text-center'>
              <img src={img} className="img-fluid"/>
            </div>
            <div className='hurray'>Hurray !</div>
            <div className='success-detail'>Your transaction 123456 has been successfully. We’ll send you a details in the email as soon as possible. In the meantime, you can use your balance to access our features..Questions? Suggestions? insightful showe thoughts? Send us an email.</div>
          </div>

          <div className='transaction-summery'>
            <div className='success-transaction-title'>Transaction Review</div>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='success-balance'>Add to Balance</div>
              <div className='success-detail'>$20.00</div>
            </div>
          </div>

          <Link to="/" className='btn-add-card profile-btn' >Back to Home</Link>   


          </div>
    </div>
   
      
          
          </div>
        
  )
}

export default Desktop