import { SyntheticEvent } from "react"
import { API_URL } from "../../../config"
import { getFormData } from "../../../utils/getFormData"
import { useStore } from "../../../store/store"
import { Req } from "../../../lib/Req/Req"


export default function useUpdateSettings() {
    
    const { auth : { user, token }, settingsActions : { updateSettings } } = useStore()

    async function update(e : SyntheticEvent) {
        e.preventDefault()

        if ( typeof token !== 'string' ) return {
            data: null,
            error: 'Invalid Token',
            code: 401,
        }

        const response = await Req.put({
            url : `${API_URL}/settings/${user?.id}`,
            payload : getFormData('#settingsForm'),
            token
        })

        if (!response.error) {
            updateSettings(response.data)
            localStorage.setItem('settings', JSON.stringify(response.data) )
        }

        return response
    }

    return update
}
