import axios from 'axios'
import * as Toastr from 'toastr'
import '../../../../node_modules/toastr/build/toastr.css'

const token = localStorage.getItem('token')

const config = {
    headers:{
        Authorization:'Bearer '+token
    }
}

export async function getTeamList(){
    try {
        const response = await axios.get('/team',config)
        return{
            data:response.data,
            status:'success'
        }
        
    } catch (error) {
        return{
            status:'error',
            message:error.message
        }
    }
}

export async function AddCardApi(data){
try {
    const response = await axios.post('/card',data,config)
    console.log(response.data)
    Toastr.success('Card Added')
    
} catch (error) {
    console.log(error.request.response)
    Toastr.success('Internal Server Error')
}
}