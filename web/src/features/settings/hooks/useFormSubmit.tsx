import { SyntheticEvent } from "react"
import { API_URL } from "../../../config"
import { getFormData } from "../../../utils/getFormData"
import { Req } from "../../../utils/req"
import { useStore } from "../../../store/store"

export default function useFormSubmit() {
    
    const { auth : { user, token } } = useStore()

    async function updateSettings(e : SyntheticEvent) {
        e.preventDefault()

        const response = await Req.send({
            url : `${API_URL}/settings/${user?.id}`,
            method : 'PUT',
            payload : getFormData('#settingsForm'),
            token
        })

        if( !response.error ) { 
            throw new Error('update settings function not implemented')
        }

        return response
    }

    return updateSettings
}
