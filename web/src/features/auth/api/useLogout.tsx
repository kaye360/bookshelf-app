import { API_URL } from "../../../config"
import { Req } from "../../../lib/Req/Req"
import { useStore } from "../../../store/store"



export default function useLogout() {

    const { auth : { token }, authActions : { updateAuth } } = useStore()

    async function logout() {

        if ( !token ) return
        
        await Req.post({ url : `${API_URL}/logout`, token })

        localStorage.clear()
        updateAuth('LOGOUT')
    }

    return logout
}
