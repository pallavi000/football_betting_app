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


function Mobile() {

  const [count,setCount] = useState([])
  const[isLoading,setIsLoading] = useState(false)
  const[amount,setAmount] = useState('')
  const[reward,setReward] = useState(0)
  const[teams,setTeams] = useState([])


  const navigate = useNavigate()


 useEffect(() => {
  const team=[]
  for(var i=0;i<2;i++){
    team.push({
      home_team:'',
      away_team:''
    })
   }
   setCount(team)
 }, [])


 
 useEffect(() => {
  getData()
  }, [])
  
 
 
   async function getData(){
   const response = await getTeamList()
   var arr=[]
   for (const team of response.data) {
    arr.push({
      value:team._id,
      label:team.name
    })
   }
console.log(arr)
   setTeams(arr)
  }
 

 function handleChange(e,index,name){
  console.log(e)
  var newcount = [...count]
  if(name=="home_team"){
    newcount[index].home_team= e.value
  }else{
    newcount[index].away_team = e.value
  }
 
  setCount(newcount)
 }

 async function handleSubmit(e){
  e.preventDefault()
  const data={
    counts:count,
    balance:amount,
    reward

  }
  setIsLoading(true)
  await AddCardApi(data)
  setIsLoading(false)
  console.log(count)
  navigate(-1)
 }
 


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
            {teams && teams.length>0?(
              <Select
        onChange={(e)=>handleChange(e,index,'home_team')}
        options={teams}
        name="home_team"
        className='team-select'
      
        styles={customStyles}
      />
            ):(
            null
            )}
     
            </div>
            <div className='add-home-team'>
            {teams && teams.length>0?(
            <Select
        onChange={(e)=>handleChange(e,index,'away_team')}
        options={teams}
        name="away_team"
        className='text-select'
        
        styles={customStyles}
      />
            ):(null)}

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
          <button className='mobile-submit-btn'>Addding</button>   

        ):(
          <button className='mobile-submit-btn'>Add</button>   
        )}

        </form>
        </div>
    </div>
  )
}

export default Mobile