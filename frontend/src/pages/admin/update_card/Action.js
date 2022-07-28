import axios from "axios";
import * as Toastr from 'toastr'
import '../../../../node_modules/toastr/build/toastr.css'

const token = localStorage.getItem('token')
    const config = {
        headers:{
            Authorization:'Bearer '+token
        }
    }


export async function getCardById(id){

    try {
        const response = await axios.get('/card/'+id,config)
        return{
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

export async function updateResultById(id,data){
    try {
        const response = await axios.put('/card/'+id,data,config)
        console.log(response.data,'success')
        Toastr.success('Card has been Updated')
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