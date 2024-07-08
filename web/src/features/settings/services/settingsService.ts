import { Settings } from "../../../types/types";
import { validSettings } from "../validation/settingsValidation_old";


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
    const userLocalStorage = localStorage.getItem("settings")
    const settings         = validSettings(userLocalStorage)
    return settings
}