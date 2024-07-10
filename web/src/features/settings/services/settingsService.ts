import { Settings } from "../../../types/types";
import { isString } from "../../../utils/validation";
import { SettingsSchema } from "../validation/settingsValidation";


export const getInitialSettings = () : Settings => ({
    currentlyReadingId : null,
    email              : null,
    filter             : 'all',
    location           : null,
    name               : null,
    sort               : 'title',
    theme              : 'light',
    view               : 'grid',
})


export function getSettingsFromLocalStorage() : Settings {
    const settingsLocalStorage = localStorage.getItem("settings")

    if ( !isString(settingsLocalStorage) ) return getInitialSettings()

    const settings = SettingsSchema.validateSync( JSON.parse(settingsLocalStorage) )
    return settings
}