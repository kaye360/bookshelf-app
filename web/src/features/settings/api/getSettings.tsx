import { useMutation } from "@tanstack/react-query"
import { API_URL } from "../../../config"
import { useStore } from "../../../store/store"
import { Req } from "../../../utils/req"
import { Settings, UserSettings } from "../../../types/types"
import { isJson } from "../../../utils/validation"


export function useSettings() {

    const { 
        auth : { token }, 
        settingsActions : { updateSettings } 
    } = useStore()

    const query = useMutation({
        mutationFn : () => getSettingsFromApi(token),
        onSuccess : (data) => {
            updateSettings(data)
            localStorage.setItem('settings', JSON.stringify(data))
        }
    })

    return query
}


function getInitialSettings() : Settings {
    return {
        currentlyReadingId : null,
        email              : null,
        filter             : 'all',
        location           : null,
        name               : null,
        sort               : 'title',
        theme              : 'light',
        view               : 'grid',
    }
}


async function getSettingsFromApi(token : string | null) : Promise<Settings> {

    if( typeof token !== 'string' ) return getInitialSettings()

    const response = await Req.send({
        url : `${API_URL}/settings`,
        token
    })

    const json = JSON.parse(response.data)
    return json as Settings
}


export function getSettingsFromLocalStorage() : Settings {
    const userLocalStorage = localStorage.getItem("settings")
    const settings         = validSettings(userLocalStorage)
    return settings
}


function validSettings(data : any) : Settings {

    const initialSettings = getInitialSettings()

    if( !isJson(data) ) {
        return initialSettings
    }

    const localStorageSettings = JSON.parse(data)

    const settingsProps : (keyof UserSettings)[] = ['currentlyReadingId', 'email', 'filter', 'location', 'name', 'sort', 'theme', 'view']

    const isValidSettingsObj = settingsProps.every(prop => Object.hasOwn(localStorageSettings, prop))

    return isValidSettingsObj ? localStorageSettings : initialSettings
}