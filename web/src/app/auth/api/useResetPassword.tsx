import { useMutation } from "@tanstack/react-query";
import { API_URL } from "../../../config";
import { Req } from "../../../lib/Req/Req";
import { getFormData } from "../../../utils/getFormData";


/**
 * 
 * The api query or mutation to be consumed across the app
 * 
 */
export function useResetPassword() {

    return useMutation({
        mutationKey : ['updatePassword'],
        mutationFn  : updatePassword,
        onSuccess : (e) => console.log(e),
        onError : (e) => console.log({e}),
        
    })
}


/**
 * 
 * The function containing the request and response.
 * Only to be used in the above hook
 * @returns a validated response or throws an error
 * 
 */
interface UpdatePassword {
    status : string
}
async function updatePassword() : Promise<UpdatePassword> {

    const payload = getFormData('#reset-password-form')

    const response = await Req.post({ 
        url : `${API_URL}/auth/updatePassword`, 
        payload
    })

    if( response.error ) {
        throw new Error(`Invalid credentials. Please try again`)
    }
    return { status : response.data }
}