import axios from "axios"
import * as Toastr from 'toastr'
import '../../../../node_modules/toastr/build/toastr.css'

const token = localStorage.getItem('token')
const config = {
    headers:{
        Authorization:'Bearer '+token
    }
}

export async function addTeam(data){
try {
    const response = await axios.post('/team',data,config)
    Toastr.success('Team created')
    return {
        status:'success',
        data:response.data
    }
    
    
} catch (error) {
    Toastr.error('Internal server error')
    return {
        status:'error',
        message:error.message
    }
    
}
}