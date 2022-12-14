import axios from 'axios'


const token = localStorage.getItem('token')

const config = {
    headers:{
        Authorization:'Bearer '+token
    }
}

export async function getActiveCard(){
try {
    const response = await axios.get('/user-card/active/get',config)
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

export async function getArchivedCard(){
    try {
        const response = await axios.get('/user-card/archived/get',config)
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

  export async function cardOfTheWeek(){
        try {
            const response = await axios.get('/user-card/card/week',config)
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