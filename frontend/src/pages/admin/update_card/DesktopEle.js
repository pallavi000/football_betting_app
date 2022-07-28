import React, { useState } from 'react'
import team1 from '../../../images/team1.png'
import team2 from '../../../images/team2.png'

function DesktopEle({match,index,results,setResults}) {
    const[selected,setSelected] = useState('')

    function handleClick(result,index){
        var newResult= [...results]
       newResult[index].result=result
       setResults(newResult)
       setSelected(result)
      }

  return (
    <tr className='tr-border'>
    <td>
        {match.home_team}<img src={match.home_team_image} className="img-fluid"></img>
    </td>
    <td>
    <div class="form-check">
  <input class="form-check-input" type="radio" name={`flexRadioDefault${index}`} onChange={(e)=>handleClick('home',index)} id="flexRadioDefault1" />
  <label class="form-check-label" for="flexRadioDefault1">
  </label>
</div>
    </td>
    <td>
    <div class="form-check">
  <input class="form-check-input" type="radio" name={`flexRadioDefault${index}`} id="flexRadioDefault1" onChange={(e)=>handleClick('draw',index)}/>
  <label class="form-check-label" for="flexRadioDefault1">
  </label>
</div>
    </td>
    <td>
    <div class="form-check">
  <input class="form-check-input" type="radio" name={`flexRadioDefault${index}`} id="flexRadioDefault1" onChange={(e)=>handleClick('away',index)}/>
  <label class="form-check-label" for="flexRadioDefault1">
  </label>
</div>
    </td>
    <td>
        {match.away_team}<img src={match.away_team_image} className="img-fluid"></img>
    </td>
</tr>
  )
}

export default DesktopEle