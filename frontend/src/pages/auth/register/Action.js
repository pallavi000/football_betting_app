import axios from "axios"
import * as Toastr from 'toastr'
import '../../../../node_modules/toastr/build/toastr.css'

export async function RegisterApi(name,email,password){
    try {
        const data={
            name,
            email,
            password
        }

        const response = await axios.post('/user/register',data)
        Toastr.success('Register Success')

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