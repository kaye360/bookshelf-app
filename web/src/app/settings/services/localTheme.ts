import { VALID_THEMES, DEFAULT_THEME } from "../../../config"
import { UserSettings } from "../../../types/types"
import { isString } from "../../../utils/validation"

export function getLocalTheme() {

    let theme = localStorage.getItem('theme') as UserSettings['theme'] | null
    
    if( !isString(theme) || !VALID_THEMES.includes(theme) ) {
        localStorage.setItem('theme', DEFAULT_THEME)
        theme = DEFAULT_THEME
    }

    return theme
}

export function updateLocalTheme(theme: UserSettings['theme']) {

    if( !VALID_THEMES.includes(theme) ) {
        localStorage.setItem('theme', DEFAULT_THEME)
        return
    }
    
    localStorage.setItem('theme', theme)
}