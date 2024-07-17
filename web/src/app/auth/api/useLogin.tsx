import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../../config";
import { Req } from "../../../lib/Req/Req";
import { useStore } from "../../../store/store";
import { AuthSuccess, LoginPayload } from "../../../types/types";
import { AuthSchema } from "../validation/authValidation";


interface LoginProps extends LoginPayload {}


/**
 * 
 * The api query or mutation to be consumed across the app
 * 
 */
export function useLogin() {

    const { authActions : { updateAuth } } = useStore()
    const client = useQueryClient()

    return useMutation({
        mutationKey : ['login'],
        mutationFn  : async(props : LoginProps) => {
            updateAuth('LOADING')
            const data = await login({...props})
            return data
        },
        onSuccess : (data) => {
            updateAuth('LOGIN', data.user, data.token)
            client.invalidateQueries({
                queryKey : ['getBooks', 'getSettings'],
            })
        },
        onError : (e) => {
            updateAuth('LOGIN_ERROR')
            console.log({e})
        }
    })
}


/**
 * 
 * The function containing the request and response.
 * Only to be used in the above hook
 * @returns a validated response or throws an error
 * 
 */
async function login(payload : LoginPayload) : Promise<Pick<AuthSuccess, 'token' | 'user'>> {

    const response = await Req.post({ 
        url : `${API_URL}/login`, 
        payload : payload
    })

    if( response.error || !response.data?.user?.id || !response.data?.access_token ) {
        throw new Error('Login Error')
    }

    const validated = AuthSchema.validateSync({
        user : response.data.user,
        token : response.data.access_token
    })

    localStorage.setItem('auth', JSON.stringify({...validated})); 
    return validated
}