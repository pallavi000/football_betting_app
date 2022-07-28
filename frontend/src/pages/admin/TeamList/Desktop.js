import React, { useEffect, useState } from 'react'
import { getTeam } from './Action'
import DataTable from 'react-data-table-component';
import {format} from 'timeago.js'
import { Link } from 'react-router-dom';


function Desktop() {
    const[teams,setTeams] = useState([])

  async  function getData(){
        const response = await getTeam()
        setTeams(response.data)
    }

    useEffect(() => {
     getData()
    }, [])


    const columns = [
      
        {
        name:<th>Image</th>,
        cell:(item)=>
        <>
        <img src={item.image} className="py-2" width={70}/>
        </>,
        },
            {
                name: <th>Name</th>,
                selector: (item)=>item.name,
                sortable:true
            },
            {
                name: <th>Short Name</th>,
                selector: (item)=>item.nickname,
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
          <div className='active-card-title'>Team lists</div>
          
              <DataTable
            columns={columns}
          data={teams}
          pagination
         
          
            actions={<Link className="btn btn-primary" to='/admin/team' >Add Team</Link>}
         
          />
         
         
         </div>
  </div>
  )
}

export default Desktop