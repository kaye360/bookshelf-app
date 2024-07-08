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
            const settings = await getSettingsFromApi(token)
            updateSettings(settings)
            localStorage.setItem('settings', JSON.stringify(settings))
            return settings
        }
    })

    if( query.isError) {
        console.log(query.error)
    }

    return query
}


async function getSettingsFromApi(token : string | null) : Promise<Settings> {

    if( typeof token !== 'string' ) return getInitialSettings()

    const response = await Req.get({ url : `${API_URL}/settings`, token })

    if( response.error ) {
        throw new Error('Settings Validation Error')
    }

    const settings  = JSON.parse(response.data) as Settings
    const validated = SettingsSchema.validateSync(settings)
    return validated
}