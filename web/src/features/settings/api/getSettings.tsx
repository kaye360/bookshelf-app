import { useQuery } from "@tanstack/react-query"
import { API_URL } from "../../../config"
import { useStore } from "../../../store/store"
import { Settings } from "../../../types/types"
import { Req } from "../../../lib/Req/Req"
import { getInitialSettings } from "../services/settingsService"


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

    return query
}


async function getSettingsFromApi(token : string | null) : Promise<Settings> {

    if( typeof token !== 'string' ) return getInitialSettings()

    const response = await Req.get({ url : `${API_URL}/settings`, token })
    const json     = JSON.parse(response.data) as Settings
    return json 
}