import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { getArchivedCard } from './Action';
import {format} from 'timeago.js'

function Desktop() {
    const[archived,setArchived] = useState([])
    const[matches,setMatches] = useState([])
   

    useEffect(() => {
    getData()
    }, [])
    

   
   async function getData(){
      var response = await  getArchivedCard()
      setArchived(response.data)
   
      
      
    }


    const columns = [
    {
        name: <th>Match No</th>,
        selector: (item)=>item._id,
        sortable:true
        
        },
        {
            name: <th>Status</th>,
            selector: (item)=>item.status,
            sortable:true
        },
        {
            name: <th>Price</th>,
            selector: (item)=>item.balance,
            sortable:true
        },
        {
            name: <th>Reward</th>,
            selector: (item)=>item.reward,
            sortable:true
        },

        {
            name: <th>Winner</th>,
            selector: (item)=>item.winners,
            sortable:true
        },

        {
            name: <th>Date</th>,
            selector: (item)=>format(item.createdAt),
            sortable:true
        },
    ];
    
    

    
  return (
    <div className='week-card-section'>
      <div className='active-card-section w-100'>
            <div className='active-card-title'>Archived Cards</div>
            {archived?(
                <DataTable
              columns={columns}
            data={archived}
            pagination
           
            />
            ):(null)}
           
           </div>
    </div>
  )
}

export default Desktop