import { SyntheticEvent } from "react"
import { API_URL } from "../../../config"
import { getFormData } from "../../../utils/getFormData"
import { useAuth } from "../../auth/hooks/useAuth"
import { Req } from "../../../utils/req"

export default function useFormSubmit() {
    
    const { user, updateUser, token } = useAuth()

    async function handleSubmit(e : SyntheticEvent) {
        e.preventDefault()

        const response = await Req.send({
            url : `${API_URL}/settings/${user?.id}`,
            method : 'PUT',
            payload : getFormData('#settingsForm'),
            token
        })

        if( !response.error ) updateUser()
    }

    return handleSubmit
}
