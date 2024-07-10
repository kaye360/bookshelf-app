import { useQuery } from "@tanstack/react-query"
import { API_URL } from "../../../config"
import { useStore } from "../../../store/store"
import { Settings } from "../../../types/types"
import { Req } from "../../../lib/Req/Req"
import { getInitialSettings } from "../services/settingsService"
import { SettingsSchema } from "../validation/settingsValidation"


export function useSettings() {

    const { 
        auth : { token }, 
        settingsActions : { updateSettings } 
    } = useStore()

    const query = useQuery({
        queryKey : ['getSettings'],
        queryFn : async () => {
            const settings = await getSettings(token)
            updateSettings(settings)
            localStorage.setItem('settings', JSON.stringify(settings))
            return settings
        }
    })

    return query
}


async function getSettings(token : string|null) : Promise<Settings> {

    if( typeof token !== 'string' ) return getInitialSettings()

    const response = await Req.get({ url : `${API_URL}/settings`, token })

    if( response.error ) {
        throw new Error('Settings Response Error')
    }

    const settings  = JSON.parse(response.data) as Settings
    const validated = await SettingsSchema.validate(settings)
    return validated
}