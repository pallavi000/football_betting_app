import React, { useEffect, useState } from 'react'
import card from '../../../images/card.png'
import team1 from '../../../images/team1.png'
import team2 from '../../../images/team2.png'
import { cardOfTheWeek, getActiveCard, getArchivedCard } from './Action'
import {Link} from 'react-router-dom'

function Desktop() {
    const[archivedCard,setArchivedCard] = useState([])
    const[activeCard,setActiveCard] = useState([])
    const[weekCard,setWeekCard] = useState()
    
    useEffect(()=>{
      getData()
    },[])
  
    async function getData(){

      var newres=  await cardOfTheWeek()
      setWeekCard(newres.data)
      console.log(newres.data)
      const response = await getActiveCard()
      if(response.data){
        setActiveCard(response.data)
        console.log(response.data)
      }
  
      const result = await getArchivedCard()
      if(result.data){
        setArchivedCard(result.data)
      }
    }

    function showResult(result){
if(result=='home'){
    return "W-L"
}
if(result=="away"){
    return "L-W"
}
if(result=="draw"){
    return "D-D"
}
    }



  return (
    <div>
<div className='week-card-section'>
    <div className='week-card-top'>
    <img src={card} class="img-fluid"/>

        <div className='week-card-title'>Card of the week</div>
        {weekCard&&(
            <Link className='new-week-card' to={`/user-add-card/${weekCard._id}`}>Add New </Link>
        )}
        <div className='card-round'></div>
    </div>
</div>


<div className='active-card-section'>
    <div className='active-card-title'>Active Cards</div>
    {activeCard.map(active=>{
        return(
            <div  className='active-card d-block' >
        <div className='d-flex justify-content-between align-items-center mb-3'>
            <div className='active-match'>Matches</div>
            <div className='active-logo'>{active.status}</div>
        </div>
        {active.matches?.map(match=>{
            return(
                <div className='match-card d-flex align-items-center justify-content-between'>
                <div className='match-team'>
                    <div className='team-img'>
                        <img src={match.home_team_image} className="img-fluid"/>
                    </div>
                    <div className='team-name'>{match.home_team}</div>
                </div>
                <div className='vs'>{showResult(match.result)}</div>
                <div className='match-team'>
                    <div className='team-img'>
                        <img src={match.away_team_image} className="img-fluid"/>
                    </div>
                    <div className='team-name'>{match.away_team}</div>
                </div>
        </div>
            )
        })}
        
    </div>
        )
    })}
    
</div>


<div className='active-card-section'>
    <div className='active-card-title'>Archived Cards</div>
    {archivedCard.map(archived=>{
        return(
            <div className='active-card'>
        <div className='d-flex justify-content-between align-items-center mb-3'>
            <div className='active-match'>Matches</div>
            <div className='active-logo archived'>{archived.status}</div>
        </div>
        {archived.matches?.map(match=>{
            return(
                <div className='match-card d-flex align-items-center justify-content-between'>
                <div className='match-team'>
                    <div className='team-img'>
                        <img src={match.home_team_image} className="img-fluid"/>
                    </div>
                    <div className='team-name'>{match.home_team}</div>
                </div>
                <div className='vs'>{showResult(match.result)}</div>
                <div className='match-team'>
                    <div className='team-img'>
                        <img src={match.away_team_image} className="img-fluid"/>
                    </div>
                    <div className='team-name'>{match.away_team}</div>
                </div>
        </div>
            )
        })}
        
    </div>
        )
    })}
    
</div>
    </div>
  )
}

export default Desktop