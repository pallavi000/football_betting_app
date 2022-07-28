import axios from "axios";
import * as Toastr from 'toastr'
import '../../../../node_modules/toastr/build/toastr.css'

const token = localStorage.getItem('token')

const config = {
    headers:{
        Authorization:'Bearer '+token
    }
}

export async function getUserById(){
    try {
        const response = await axios.get('/user/current/user',config)
        return {
            status:'success',
            data:response.data
        }
    } catch (error) {
        return {
            status:'error',
            message:error.message
        }
    }
}


export async function addUserCard(data){
try {
    const response = await axios.post('/user-card',data,config)
    Toastr.success('Card Added.')
    return {
        status:'success',
        data:response.data
    }
} catch (error) {
    Toastr.error('Internal Server Error')
    return {
        status:'error',
        message:error.message
    }
}
}

export async function CardOfTheWeekById(id){
    try {
        const response = await axios.get('/user-card/card/week/'+id,config)
        return {
            status:'success',
            data:response.data
        }
    } catch (error) {
        return{
            status:'error',
            message:error.message
        }
        
    }
}




