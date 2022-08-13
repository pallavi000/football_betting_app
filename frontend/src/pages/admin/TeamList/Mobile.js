import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTeam } from './Action'

function Mobile({teams}) {


  return (
    <div className='mobile-card-section'>
      <div className='mobile-card'>
        <div className='clearfix'>
          <Link to={'/admin/teams/create'} className='btn btn-primary btn-sm float-end'>Add New</Link>
        </div>
        {teams && teams.length ?(
          <table className='w-100 mt-3'>
          <tbody>
          {teams.map(team=>{
            return(
                <tr className='active-card-section w-100'>
                  <td className='team1-img p-3'>
                    <img src={team.image}/>
                  </td>
                  <td className="p-3 card-team-name" align='center'>{team.nickname}</td>
                  <td className="p-3 card-team-name" align='right'>{team.name}</td>
                </tr>
            )
          })}
          </tbody>
          </table>
        ):(
          <div className='active-card-section'>
          <div className='d-flex align-items-center justify-content-between'>
            <h3>No Teams Added.</h3>
          </div>
          </div>
        )}


      </div>
    </div>
  )
}

export default Mobile