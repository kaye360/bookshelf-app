import { useMutation } from "@tanstack/react-query";
import { API_URL } from "../../../config";
import { Req } from "../../../lib/Req/Req";
import { getFormData } from "../../../utils/getFormData";


/**
 * 
 * The api query or mutation to be consumed across the app
 * 
 */
export function useResetPasswordRequest() {

    return useMutation({
        mutationKey : ['resetPasswordRequest'],
        mutationFn  : resetPasswordRequest,
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
    message : string
}
async function resetPasswordRequest() : Promise<UpdatePassword> {

    const payload = getFormData('#reset-password-request-form')

    if( !payload.username ) {
        throw new Error('Invalid username')
    }

    const response = await Req.post({ 
        url : `${API_URL}/auth/resetPasswordRequest`, 
        payload
    })

    if( response.code === 400 ) {
        throw new Error('Username not found')
    }
    if( response.error ) {
        throw new Error( response.error ) 
    }

    return { 
        status : response.data.status,
        message : response.data.message
    }
}