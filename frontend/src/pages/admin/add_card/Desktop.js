import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AddCardApi, getTeamList } from './Action'

function Desktop() {
    const [count,setCount] = useState([])
    const[isLoading,setIsLoading] = useState(false)
    const[amount,setAmount] = useState(0)
    const[reward,setReward] = useState(0)
    const[team,setTeam] = useState([])

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
  setTeam(response.data)
 }

 function handleChange(e,index){
  var newcount = [...count]
  if(e.target.name=="home_team"){
    newcount[index].home_team= e.target.value
  }else{
    newcount[index].away_team = e.target.value
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
  navigate(-1)
  console.log(count)
 }
 

  return (
    <div className='add-card-section'>
        <div className='add-card-title'>Add Card</div>
        <div className='add-card-form'>
            <form onSubmit={(e)=>handleSubmit(e)}>
            {count.map((team,index)=>{
                return(
                    <>
                    <div className='form-group row'>
                <div className='col'>
                    <label>Home Team</label>
                    <input className='form-control' name="home_team" type="text" onChange={(e)=>handleChange(e,index)} required></input>
                </div>
                <div className='col'>
                    <label>Away Team</label>
                    <input className='form-control' name="away_team" type="text" onChange={(e)=>handleChange(e,index)} required></input>
                </div>
               </div>
                    </>
                )
                
            })}

            <div className='col'>
                    <label>Amount </label>
                    <input className='form-control' name="" type="number" onChange={(e)=>setAmount(e.target.value)} required></input>
                </div>

                <div className='col'>
                    <label>Reward </label>
                    <input className='form-control' name="" type="number" placeholder='Reward for winner' onChange={(e)=>setReward(e.target.value)} required></input>
                </div>

            {isLoading?(
              <button className='btn-add-card'>Adding.. <i class="fa-solid fa-arrow-right"></i></button>
            ):(
              <button className='btn-add-card'>Add <i class="fa-solid fa-arrow-right"></i></button>
            )}
            </form>
        </div>
    </div>
  )
}

export default Desktop