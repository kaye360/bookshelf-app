import { SyntheticEvent } from "react"
import { API_URL } from "../../../config"
import { getFormData } from "../../../utils/getFormData"
import useFetch from "../../../hooks/useFetch"
import { useAuth } from "../../auth/hooks/useAuth"

export default function useFormSubmit() {
    
    const { user, updateUser } = useAuth()
    const { fetchApi }         = useFetch()

    async function handleSubmit(e : SyntheticEvent) {
        e.preventDefault()

        const response = await fetchApi({
            url : `${API_URL}/settings/${user?.id}`,
            method : 'PUT',
            auth : true,
            payload : getFormData('#settingsForm')
        })

        if( !response.error ) updateUser()
    }

    return handleSubmit
}
