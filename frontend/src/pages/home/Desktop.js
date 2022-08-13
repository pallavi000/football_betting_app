import React, { useEffect } from 'react'
import Header from '../../global/header/Header'
import home from '../../images/home.png'
import $ from 'jquery'
import { Link } from 'react-router-dom'

function Desktop() {
  useEffect(() => {
  $('.content-section').css('max-width','100%')
  }, [])
  
  return (
    <>
    <div className='home-section row'>
    <div className='col-md-3 home-image-section'>
    <img src={home} className="img-fluid"/>
    <div className='home-round'></div>
  </div>
    <div className='col-md-9 home-detail-section'>
      <div className='home-card'>
        <div className='home-card-title'>Bet Soccer Matches</div>
        <div className='home-card-detail'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum felis hendrerit quis egestas ac.</div>

        <div className='d-flex justify-content-center align-items-center'>
          <div className='home-card-btn'>Download App</div>
          <Link to={'/login'} className='home-card-btn'>Visit Website</Link>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default Desktop