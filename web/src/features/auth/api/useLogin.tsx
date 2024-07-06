import { API_URL } from "../../../config";
import { Req } from "../../../lib/Req/Req";
import { useStore } from "../../../store/store";
import { LoginPayload } from "../../../types/types";

export function useLogin() {

    const { authActions : { updateAuth } } = useStore()
    const url = `${API_URL}/login`

    async function login(payload : LoginPayload) {

        updateAuth('LOADING')
    
        const response = await Req.post({ url, payload })

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
