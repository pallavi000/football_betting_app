import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addUserCard, CardOfTheWeekById, getUserById } from './Action'
import * as Toastr from 'toastr'
import '../../../../node_modules/toastr/build/toastr.css'
import UpdateEle from '../../admin/update_card/UpdateEle'

function Mobile() {
  const [results,setResults] = useState([])
  const params = useParams()
  const[card,setCard] = useState({})
  const[isLoading,setIsLoading] = useState(false)
  const[user,setUser] = useState({})



  const navigate = useNavigate()

  useEffect(() => {
     getData()
     getUser()
     }, [])


    async function getUser(){
     const response = await getUserById()
        setUser(response.data)
    }

   async  function getData(){
     const response= await CardOfTheWeekById(params.id)
     if(response.data){
      setCard(response.data)
      var arr=[]
      for (const match of response.data.matches) {
       arr.push({
         _id:match._id,
         result:'',
         home_team:match.home_team,
         away_team:match.away_team,
         home_team_nickname:match.home_team_nickname,
         away_team_nickname:match.away_team_nickname,
         home_team_image:match.home_team_image,
         away_team_image:match.away_team_image
       })
      }
      setResults(arr)
     }else{
      window.location.href="/not-found"
     }
     
     }


    async function updateResult(){
      if(user.balance>=card.balance){
        setIsLoading(true)
        const data={
            results,
            card_id:params.id
        }
       var res= await addUserCard(data)
       setIsLoading(false)
       console.log(res.data)
       navigate(-1)
      }else{
        Toastr.error('Insufficient Balance')
        navigate('/add-balance')
      }
     
      
     }

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
      <div className='mobile-submit-btn'>Paying</div>   
    ):(
      <div className='mobile-submit-btn'  onClick={()=>updateResult()}>Pay ({card.balance})</div>   
    )}
    </div>
</div>
  )
}

export default Mobile