import axios from "axios"
import * as Toastr from 'toastr'
import '../../../../node_modules/toastr/build/toastr.css'

export async function LoginApi(email,password){

    try {
        const data={
            email,
            password
        }
        const response = await axios.post('/user/login',data)
        Toastr.success('Login Success')
        console.log(response.data)
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('user',JSON.stringify(response.data.user))
        
       return {
        status:'success',
        data: response.data
        }
    } catch (error) {
        Toastr.error('Internal Server Error')
        return{
            status:'error',
            message:error.message
        }
    }
}