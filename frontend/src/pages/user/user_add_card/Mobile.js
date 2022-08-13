import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addUserCard, CardOfTheWeekById, getUserById } from './Action'
import * as Toastr from 'toastr'
import '../../../../node_modules/toastr/build/toastr.css'
import UpdateEle from '../../admin/update_card/UpdateEle'
import { globalContext } from '../../../global/GlobalContext'

function Mobile({card, results, setResults, isLoading, isAllFilled, handleSubmit}) {
 

  return (
    <div className='mobile-card-section'>
    <div className='mobile-card'>
    <div className='d-flex align-items-center justify-content-between'>
    <div className='mobile-card-active'>Update Results</div>
    </div>
    {card.matches?.map((match,index)=>{
      return(
        <UpdateEle match={match} index={index} results={results} setResults={setResults}/>
      )
    })}
    {isLoading?(
      <button className='mobile-submit-btn' disabled>Paying</button>   
    ):!isAllFilled ? (
      <button className='mobile-submit-btn' disabled>Predict Incomplete</button>   
    ):(
      <button className='mobile-submit-btn'  onClick={()=>handleSubmit()}>Pay ({card.balance})</button>   
    )}
    </div>
</div>
  )
}

export default Mobile