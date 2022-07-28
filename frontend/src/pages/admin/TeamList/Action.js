import axios from "axios"

const token = localStorage.getItem('token')
const config = {
    headers:{
        Authorization:'Bearer '+token
    }
}


export async function getTeam(){
    try {
        const response = await axios.get('/team',config)
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