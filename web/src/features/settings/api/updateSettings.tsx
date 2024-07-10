import { API_URL } from "../../../config"
import { getFormData } from "../../../utils/getFormData"
import { useStore } from "../../../store/store"
import { Req } from "../../../lib/Req/Req"
import { User } from "../../../types/types"
import { SettingsSchema } from "../validation/settingsValidation"
import { useMutation } from "@tanstack/react-query"


export default function useUpdateSettings() {
    
    const { 
        auth : { user, token }, 
        settingsActions : { updateSettings } 
    } = useStore()

    const query = useMutation({
        mutationKey : ['updateSettings'],
        mutationFn : async () => {
            const settings = await updateSettingsToApi(user, token) 
            updateSettings(settings)
            localStorage.setItem('settings', JSON.stringify(settings))
        },
        onError : (error) => console.log(error.message)
    })

    return query
}


async function updateSettingsToApi(user: User | null, token : string|null) {

    if ( user  === null)  throw new Error('Invalid User')
    if ( token === null)  throw new Error('Invalid Token')

    const response = await Req.put({
        url : `${API_URL}/settings/${user?.id}`,
        payload : getFormData('#settingsForm'),
        token
    })

    if( response.error ) throw new Error(response.error)

    const validated = await SettingsSchema.validate(response.data)
    return validated
}