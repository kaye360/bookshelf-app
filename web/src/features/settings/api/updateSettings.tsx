import { API_URL } from "../../../config"
import { getFormData } from "../../../utils/getFormData"
import { useStore } from "../../../store/store"
import { Req } from "../../../lib/Req/Req"
import { User } from "../../../types/types"
import { SettingsSchema } from "../validation/settingsValidation"
import { useMutation } from "@tanstack/react-query"


/**
 * 
 * The api query or mutation to be consumed across the app
 * 
 */
export default function useUpdateSettings() {
    
    const { 
        auth : { user, token }, 
        settingsActions : { updateSettings } 
    } = useStore()

    return useMutation({
        mutationKey : ['updateSettings'],
        mutationFn : async () => {
            const settings = await updateSettingsToApi(user, token) 
            updateSettings(settings)
            localStorage.setItem('settings', JSON.stringify(settings))
        },
        onError : (error) => console.log(error.message)
    })
}


/**
 * 
 * The function containing the request and response.
 * Only to be used in the above hook
 * @returns a validated response or throws an error
 * 
 */
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