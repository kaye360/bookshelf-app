import { API_URL } from "../../../config"
import { useStore } from "../../../store/store"
import { Req } from "../../../utils/req"


export default function useLogout() {

    const { auth : { token }, actions : { updateAuth } } = useStore()

    async function logout() {

        if ( !token ) return
        
        await Req.send({
            url : `${API_URL}/logout`,
            method : 'POST',
            token
        })

        localStorage.clear()
        updateAuth('LOGOUT')
    }

    return logout
}
