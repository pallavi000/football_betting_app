import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'
import { getTransactionById } from './Action'
import DataTable, { createTheme } from 'react-data-table-component';



// createTheme creates a new theme named solarized that overrides the build in dark theme
createTheme('solarized', {
  text: {
    primary: '#fff',
    secondary: '#f0f7fb',
  },
  background: {
    default: '#181829',
  },
  divider: {
    default: '#65656B',
  }
}, 'dark');


function Mobile() {

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
    <div className="container-fluid mt-5 ">
    <div className='active-card-title'>Transaction List</div>


    <DataTable
        columns={columns}
        data={transactions}
        pagination
        theme='solarized'
       
       
        
    />
  

    
</div>
</div>
  )
}

export default Mobile