import { useQuery } from "@tanstack/react-query"
import { API_URL } from "../../../config"
import { useStore } from "../../../store/store"
import { Settings } from "../../../types/types"
import { Req } from "../../../lib/Req/Req"
import { getDefaultSettings } from "../services/getDefaultSettings"
import { SettingsSchema } from "../validation/settingsValidation"


/**
 * 
 * The api query or mutation to be consumed across the app
 * 
 */
export function useSettings() {

    const { 
        auth : { token }, 
        settingsActions : { updateSettings, updateSettingsStatus } 
    } = useStore()

    return useQuery({
        queryKey : ['getSettings', token],
        queryFn : async () => {
            updateSettingsStatus('LOADING')
            const settings = await getSettings()
            updateSettings(settings)
            updateSettingsStatus('SUCCESS')
            return settings
        }
    })
}

/**
 * 
 * The function containing the request and response.
 * Only to be used in the above hook
 * @returns a validated response or throws an error
 * 
 */
async function getSettings() : Promise<Settings> {

    const token = useStore.getState().auth.token
    if( typeof token !== 'string' ) return getDefaultSettings()

    const response = await Req.get({ url : `${API_URL}/settings`, token })

    if( response.error ) {
        throw new Error('Settings Response Error')
    }

    const settings  = JSON.parse(response.data)
    const validated = await SettingsSchema.validate(settings)
    
    return validated
}