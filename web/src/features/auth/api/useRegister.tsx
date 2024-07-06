import { API_URL } from "../../../config";
import { Req } from "../../../lib/Req/Req";
import { useStore } from "../../../store/store";
import { RegisterPayload } from "../../../types/types";


export default function useRegister() {

    const { authActions : { updateAuth } } = useStore()

    async function register(payload: RegisterPayload) {

        try {

            updateAuth('LOADING')
    
            const response = await Req.post({ url : `${API_URL}/register`, payload })
    
            if ( response.data.access_token ) {

                updateAuth('REGISTER', response.data.user, response.data.access_token)

                localStorage.setItem('auth', JSON.stringify({
                    token : response.data.access_token,
                    user : response.data.user
                }))

                return response.data
            }
    
            updateAuth('REGISTER_ERROR')
            
        } catch (error) {
            updateAuth('REGISTER_ERROR')    
        }
    }

    return register

}