import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AddCardApi, getTeamList } from './Action'
import Select from 'react-select'

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px solid #999',
    color: state.isSelected ? 'white' : '#65656B',
    background: state.isSelected ? '#333' : '#222232',
    "&:hover": {
      background: "#65656B",
      color:'white',
      borderColor:'#65656B'
    }
   
  }),
  control: (provided,state) => ({
    ...provided,
    background: '#181829',
    borderColor:'#222232',
    padding: '5px',
    borderRadius:'4px'
   
  }),
  menu: (provided, state) => ({
    ...provided,
    background: '#222232',
  }),
  singleValue: (provided,state)=>({
    ...provided,
    color: 'white',
  })
}


function Mobile({handleChange, handleSubmit, count, teams, setAmount, setReward, isLoading, isAllFilled}) {

  
  return (
    <div className='mobile-card-section'>
        <div className='mobile-card'>
        <div className='d-flex align-items-center justify-content-between'>
        <div className='mobile-card-active'>Add Card</div>
        </div>
        <form onSubmit={(e)=>handleSubmit(e)}>
        
        {count.map((team,index)=>{
          return(
            <div className='active-card-section'>
          <div className='active-card-match'>Match #{index+1}</div>
          <div className=' mt-4'>
            <div className='add-home-team'>
              <Select
        onChange={(e)=>handleChange(e,index,'home_team')}
        options={teams}
        name="home_team"
        className='team-select'
        placeholder="Home Team"
        styles={customStyles}
        formatOptionLabel={team => (
          <div className="d-flex align-items-center">
            <img src={team.image} className="bg-transparent shadow-none" height={30}/>
            <span>{team.label}</span>
          </div>
        )}
      />
           
     
            </div>
            <div className='add-home-team'>
            <Select
        onChange={(e)=>handleChange(e,index,'away_team')}
        options={teams}
        name="away_team"
        className='text-select'
        placeholder="Away Team"
        styles={customStyles}
        formatOptionLabel={team => (
          <div className="d-flex align-items-center">
            <img src={team.image} className="bg-transparent shadow-none" height={30}/>
            <span>{team.label}</span>
          </div>
        )}
      />

            </div>
          </div>

      

     

          <div className='d-flex justify-content-between align-items-center mt-4'>
            
          </div>
        </div>
          )
        })}
        <div className='active-card-section'>
        <div className='add-home-team'>
            <input type="number" placeholder='Amount to participate'  onChange={(e)=>setAmount(e.target.value)} required></input>
            </div>
            <div className='add-home-team'>
            <input type="number" placeholder='Reward for winner'  onChange={(e)=>setReward(e.target.value)} required></input>
            </div>
            </div>
        
      

        {isLoading?(
          <button className='mobile-submit-btn' disabled>Adding</button>   
        ):!isAllFilled ?(
          <button className='mobile-submit-btn' disabled>Fill Out Form</button>   
        ):(
          <button className='mobile-submit-btn'>Add</button>   
        )}

        </form>
        </div>
    </div>
  )
}

export default Mobile