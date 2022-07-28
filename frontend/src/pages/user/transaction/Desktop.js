import React, { useEffect, useState } from 'react'
import { getTransactionById } from './Action'
import DataTable from 'react-data-table-component';
import {format} from 'timeago.js'

function Desktop() {
    const[transactions,setTransactions] = useState([])

  async  function getData(){
     const response =    await getTransactionById()
     setTransactions(response.data)
    }

    useEffect(() => {
     getData()
    }, [])

    const columns = [
       
            {
              name: <th>Transaction Id</th>,
              selector: (item)=>item._id,
              sortable:true
              
            },
            {
              name:<th>Amount</th>,
              selector:(item)=>item.amount,
              sortable:true
            },
            {
                name:<th>Payment Method</th>,
                selector:(item)=>item.payment_method,
                sortable:true
              },
              {
                name:<th>Created At</th>,
                selector:(item)=>format(item.created_at),
                sortable:true
              },
          ]
    
  return (
    <div className="content-wrapper">
        <div className="container-fluid px-5 mt-5 ">
        <div className='active-card-title'>Transaction List</div>


        <DataTable
            columns={columns}
            data={transactions}
            pagination
           
           
            
        />
      

        
    </div>
    </div>
  )
}

export default Desktop