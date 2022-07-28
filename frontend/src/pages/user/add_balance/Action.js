import axios from "axios";
import * as Toastr from 'toastr'
import '../../../../node_modules/toastr/build/toastr.css'

export async function addBalance(data){
    const token = localStorage.getItem('token')

const config = {
    headers:{
        Authorization:'Bearer '+token
    }
}

try {
    console.log(data)
    const response = await axios.put('/user/balance/update',data,config)
    Toastr.success('Balance has been added successfully')
    return{
        status:'success',
        data:response.data
    }
} catch (error) {
    Toastr.error('Internal Server Error')
    return{
        status:'error',
        message:error.message
    }
}
}