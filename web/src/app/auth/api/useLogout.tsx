import { useQueryClient } from "@tanstack/react-query"
import { API_URL } from "../../../config"
import { Req } from "../../../lib/Req/Req"
import { useStore } from "../../../store/store"



export default function useLogout() {

    const { auth : { token }, authActions : { updateAuth } } = useStore()

    const queryClient = useQueryClient()

    async function logout() {

        localStorage.clear()
        queryClient.clear()
        
        if ( !token ) return
        
        const response = await Req.post({ url : `${API_URL}/logout`, token })
        
        if( response.error ) {
            window.location.reload()
        }

        updateAuth('LOGOUT')
    }

    return logout
}
