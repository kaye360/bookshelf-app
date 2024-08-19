import { API_URL } from "../../../config"
import { getFormData } from "../../../utils/getFormData"
import { useStore } from "../../../store/store"
import { Req } from "../../../lib/Req/Req"
import { SettingsSchema } from "../validation/settingsValidation"
import { useMutation } from "@tanstack/react-query"
import { updateLocalTheme } from "../services/localTheme"

/**
 * 
 * The api query or mutation to be consumed across the app
 * 
 */
export default function useUpdateSettings() {
    
    const {  settingsActions : { updateSettings } } = useStore()

    return useMutation({
        mutationKey : ['updateSettings'],
        mutationFn : async () => {
            const settings = await updateSettingsToApi() 
            updateSettings(settings)
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
async function updateSettingsToApi() {

    const token = useStore.getState().auth.token
    const user  = useStore.getState().auth.user

    if ( !user || !token ) {
        throw new Error('Invalid auth credentials')
    }

    const response = await Req.put({
        url : `${API_URL}/settings/${user?.id}`,
        payload : getFormData('#settingsForm'),
        token
    })

    if( response.error ) throw new Error(response.error)

    const validated = await SettingsSchema.validate(response.data)
    updateLocalTheme(validated.theme)
    return validated
}