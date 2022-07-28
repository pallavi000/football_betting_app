import React, { useEffect, useState } from 'react'
import cardImage from '../../../images/cw.png'
import team1 from '../../../images/team1.png'
import team2 from '../../../images/team2.png'
import card from '../../../images/card.png'
import { getActiveCard, getArchivedCard } from './Action'
import { Link } from 'react-router-dom'


function Mobile() {

  const[archivedCard,setArchivedCard] = useState([])
  const[activeCard,setActiveCard] = useState([])
  useEffect(()=>{
    getData()
  },[])

  async function getData(){
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
    <div className='mobile-card-section'>
        <div className='mobile-card-top'>
        <div className='week-card-top'>
    <img src={card} class="img-fluid"/>

        <div className='week-card-title'>Card of the week</div>
        <Link className='new-week-card' to="/admin/add-card">Add New </Link>
        <div className='card-round'></div>
    </div>
          {/* <img src={cardImage} className="img-fluid"/> */}
        </div>
        <div className='mobile-card'>
        <div className='d-flex align-items-center justify-content-between'>
        <div className='mobile-card-active'>Active Card</div>
        <div className='mobile-view-all'>View All</div>
        </div>
        {activeCard.map(active=>{
          return(
            <Link className='active-card-section d-block' to={`/admin/update-card/${active._id}`}>
          <div className='active-card-action text-capitalize'>{active.status}</div>
          {active.matches?.map(match=>{
            return(
              <div className='d-flex justify-content-between align-items-center mt-4'>
            <div className='card-image-logo d-flex align-items-center'>
              <div className='team1-img'>
                <img src={match.home_team_image} className="img-fluid"/>
              </div>
              <div className='team1-img'>
                <img src={match.away_team_image} className="img-fluid"/>
              </div>
            </div>
            <div className='card-team-name'>{match.home_team_nickname} VS {match.away_team_nickname} </div>
          </div>
            )
          })} 
        </Link>
          )
        })}
        </div>

{archivedCard.map(archived=>{
  return(
    <div className='mobile-card'>
        <div className='d-flex align-items-center justify-content-between'>
        <div className='mobile-card-active'>{archived.status} Card</div>
        <Link className='mobile-view-all' to="/admin/archived-card">View All</Link>
        </div>
        <div className='active-card-section'>
          <div className='active-card-action'>{archived.status}</div>
          {archived.matches?.map(arch=>{
            return(
              <div className='d-flex justify-content-between align-items-center mt-4'>
            <div className='card-image-logo d-flex align-items-center'>
              <div className='team1-img'>
                <img src={arch.home_team_image} className="img-fluid"/>
              </div>
              <div className='team1-img'>
                <img src={arch.away_team_image} className="img-fluid"/>
              </div>
            </div>
            <div className='card-team-name'>{arch.home_team_nickname} {showResult(arch.result)} {arch.away_team_nickname} </div>
          </div>
            )
          })}
        </div>
        </div>
  )
})}
        
    </div>
  )
}

export default Mobile