import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import team1 from '../../../images/team1.png'
import team2 from '../../../images/team2.png'
import { getCardById } from '../../admin/update_card/Action'
import DesktopEle from '../../admin/update_card/DesktopEle'
import { cardOfTheWeek } from '../user_cards/Action'
import { addUserCard, CardOfTheWeekById, getUserById } from './Action'
import * as Toastr from 'toastr'
import '../../../../node_modules/toastr/build/toastr.css'


function Desktop() {
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


      async function handleSubmit(){
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
    <div className='update-card-section'>
        <div className='update-card-title'>Add Card</div>
        <table className='text-center'>
            <thead>
                <tr>
                    <th>Home Team</th>
                    <th>Win</th>
                    <th>Draw</th>
                    <th>Win</th>
                    <th>Away Team</th>
                </tr>
            </thead>
            <tbody>
           {card.matches?.map((match,index)=>{
            return(
                <DesktopEle match={match} index={index} results={results} setResults={setResults}/>
    
            )
           })}  
            </tbody>
        </table>
          {isLoading?(
            <button className='btn-add-card'>Paying<i class="fa-solid fa-arrow-right"></i></button>
          ):(
            <button className='btn-add-card' onClick={()=>handleSubmit()}>Pay  ({card.balance})<i class="fa-solid fa-arrow-right"></i></button>
          )}

    </div>
  )
}

export default Desktop