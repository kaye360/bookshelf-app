import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../../config";
import { Req } from "../../../lib/Req/Req";
import { useStore } from "../../../store/store";
import { AuthSuccess, LoginPayload } from "../../../types/types";
import { AuthSchema } from "../validation/authValidation";


interface LoginProps extends LoginPayload {}


export function useLogin() {

    const { authActions : { updateAuth } } = useStore()
    const client = useQueryClient()

    const query = useMutation({
        mutationKey : ['login'],
        mutationFn  : async(props : LoginProps) => {
            updateAuth('LOADING')
            const data = await login({...props})
            return data
        },
        onSuccess : (data) => {
            updateAuth('LOGIN', data.user, data.token)
            client.invalidateQueries({
                queryKey : ['getUserBooks']
            })
        },
        onError : () => updateAuth('LOGIN_ERROR')
    })

    return query
}


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