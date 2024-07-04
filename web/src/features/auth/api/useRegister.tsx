import { API_URL } from "../../../config";
import { useStore } from "../../../store/store";
import { RegisterPayload } from "../../../types/types";
import { Req } from "../../../utils/req";


export default function useRegister() {

    const { actions : { updateAuth } } = useStore()

    async function register(payload: RegisterPayload) {

        try {

            updateAuth('LOADING')
    
            const response = await Req.send({
                url     : `${API_URL}/register`,
                method  : 'POST',
                payload
            })
    
            if ( response.data.access_token ) {

                updateAuth('REGISTER', response.data.user, response.data.access_token)

                localStorage.setItem('auth', JSON.stringify({
                    token : response.data.access_token,
                    user : response.data.user
                }));
                return response.data
            }
    
            updateAuth('REGISTER_ERROR')
            
        } catch (error) {
            updateAuth('REGISTER_ERROR')    
        }
    }

    return register

}