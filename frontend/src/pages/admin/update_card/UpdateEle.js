import React, { useState } from 'react'
import team1 from '../../../images/team1.png'


function UpdateEle({match,index,results,setResults}) {
    const[selected,setSelected] = useState('')

    function handleClick(result,index){
      var newResult= [...results]
     newResult[index].result=result
     setResults(newResult)
     setSelected(result)
    }
  return (
    <div className='active-card-section'>
      <div className='active-card-match'>Match #{index+1}</div>
      <div className=' d-flex justify-content-between align-items-center mt-4'>
        <div className='mobile-team-opponent d-flex align-items-center'>
          <div className='opponent-name'>{match.home_team_nickname}</div>
          <img src={match.home_team_image} className="img-fluid"></img>
        </div>
        <div className='vs'>VS</div>
        <div className='mobile-team-opponent d-flex align-items-center'>
          <img src={match.away_team_image} className="img-fluid"></img>
          <div className='opponent-name right'>{match.away_team_nickname}</div>
        </div>
      </div>
      <div className='d-flex justify-content-between align-items-center mt-3'>
        <div className={`win-icon ${selected=='home'?'active':''}`} onClick={(e)=>handleClick('home',index)}>Win</div>
        <div className={`win-icon ${selected=='draw'?'active':''}`} onClick={(e)=>handleClick('draw',index)}>Draw</div>
        <div className={`win-icon ${selected=='away'?'active':''}`} onClick={(e)=>handleClick('away',index)}>Win</div>
      </div>

      
    </div>
  )
}

export default UpdateEle