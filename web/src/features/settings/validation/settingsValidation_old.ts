import { Settings, UserSettings } from "../../../types/types"
import { isJson } from "../../../utils/validation"
import { getInitialSettings } from "../services/settingsService"


export function validSettings(data : any) : Settings {

    const initialSettings = getInitialSettings()

    if( !isJson(data) ) {
        return initialSettings
    }

    const localStorageSettings = JSON.parse(data)

    const settingsProps : (keyof UserSettings)[] = ['currentlyReadingId', 'email', 'filter', 'location', 'name', 'sort', 'theme', 'view']

    const isValidSettingsObj = settingsProps.every(prop => Object.hasOwn(localStorageSettings, prop))

    return isValidSettingsObj ? localStorageSettings : initialSettings
}