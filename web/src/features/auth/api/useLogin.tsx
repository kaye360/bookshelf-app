import { API_URL } from "../../../config";
import { useStore } from "../../../store/store";
import { LoginPayload } from "../../../types/types";
import { Req } from "../../../utils/req";

export function useLogin() {

    const { actions : { updateAuth } } = useStore()
    const url = `${API_URL}/login`

    async function login(payload : LoginPayload) {

        updateAuth('LOADING')
    
        const response = await Req.send({
            url,
            method : 'POST',
            payload
        })

        if( response.data?.user?.id && response.data?.access_token ) {

            localStorage.setItem('auth', JSON.stringify({
                token : response.data.access_token,
                user  : response.data.user
            })); 

            updateAuth('LOGIN', response.data.user, response.data.access_token) 

        } else {
            updateAuth('LOGIN_ERROR')
        }

        return response
    }

    return login
}
