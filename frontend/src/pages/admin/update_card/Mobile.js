import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { getCardById, updateResultById } from './Action'
import UpdateEle from './UpdateEle'

function Mobile() {
  const params = useParams()
  const[card,setCard] = useState({})
  const[results,setResults] = useState([])
  const[isLoading,setIsLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    getData()
  }, [])

 async function getData(){
    const response= await getCardById(params.id)
    console.log(response.data)
    if(response.data){
      setCard(response.data)
      var arr=[]
     for (const match of response.data.matches) {
      arr.push({
        _id:match._id,
        result:''
      })
     }
     setResults(arr)
 
    }

  }


 async function updateResult(){
 setIsLoading(true)
    const data={
      results
    }
   await updateResultById(params.id,data)
   setIsLoading(false)
   navigate('-1')
   
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
      <div className='mobile-submit-btn'>Updating</div>   
    ):(
      <div className='mobile-submit-btn'  onClick={()=>updateResult()}>Update Result</div>   
    )}
    </div>
</div>
  )
}

export default Mobile