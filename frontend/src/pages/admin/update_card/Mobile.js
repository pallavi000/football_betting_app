import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { getCardById, updateResultById } from './Action'
import UpdateEle from './UpdateEle'

function Mobile({card, results, setResults, isLoading, isAllFilled, updateResult}) {
  
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
      <button className='mobile-submit-btn'>Updating</button>   
    ):!isAllFilled?(
      <button className='mobile-submit-btn' disabled>Fill Out Form</button>  
    ):(
      <div className='mobile-submit-btn'  onClick={()=>updateResult()}>Update Result</div>   
    )}
    </div>
</div>
  )
}

export default Mobile