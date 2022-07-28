import axios from "axios"
import * as Toastr from 'toastr'
import '../../../../node_modules/toastr/build/toastr.css'

const token = localStorage.getItem('token')
const config = {
    headers:{
        Authorization:'Bearer '+token
    }
}



export async function PasswordChange(data){
try {
    const response = await axios.post('/user/change/password',data,config)
    console.log(response.data)
    Toastr.success('Password Updated')
    return{
        status:'success',
        data:response.data
    }
    
    
} catch (error) {
    Toastr.error('Internal server error')

    return{
        status:'error',
        message:error.message
    }
}




}