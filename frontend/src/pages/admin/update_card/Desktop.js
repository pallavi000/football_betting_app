import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCardById, updateResultById } from './Action'
import DesktopEle from './DesktopEle'



function Desktop() {
    const params = useParams()
    const[card,setCard] = useState({})
    const[results,setResults] = useState([])
    const navigate =useNavigate()
    const[isLoading,setIsLoading] = useState(false)
  
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
      const data={
        results
      }
      setIsLoading(true)
     await updateResultById(params.id,data)
     setIsLoading(false)
     navigate(-1)
    }
    
  return (
    <div className='update-card-section'>
        <div className='update-card-title'>Update Result</div>
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
                <button className='btn-add-card' onClick={()=>updateResult()}>Updating<i class="fa-solid fa-arrow-right"></i></button>

              ):(
                <button className='btn-add-card' onClick={()=>updateResult()}>Update Result<i class="fa-solid fa-arrow-right"></i></button>
              )}

    </div>
  )
}

export default Desktop