import { SettingsCreator } from "./types";


export const settingsSlice: SettingsCreator = (set) => ({
    settings : {
        currentlyReadingId : null,
    
        name     : null,
        email    : null,
        location : null,
    
        filter : 'all',
        sort   : 'title',
        theme  : 'light',
        view   : 'grid',
    
        update : () => {}
    }
})