import { StateCreator } from "zustand";
import { UserSettings } from "../features/settings/types/types";
import { BookshelfFilters, BookshelfSorts, BookshelfViews } from "../features/bookshelf/types/types";
import { Auth, User } from "../types/types";


export interface SettingsSlice {
    settings : {
        currentlyReadingId : string | null
        email              : string | null
        filter             : BookshelfFilters
        location           : string | null
        name               : string | null
        sort               : BookshelfSorts
        theme              : 'light' | 'dark'
        view               : BookshelfViews
        update : (settings : UserSettings) => void
    }
}


export type AuthSlice = { 
    auth : Auth,
    actions : {
        updateAuth : (
            action : 'LOADING' | 'LOGIN' | 'LOGIN_ERROR' | 'REGISTER' | 'REGISTER_ERROR' | 'LOGOUT', 
            user?  : User,
            token? : string
        ) => void
    }
}


export type SettingsCreator = StateCreator<SettingsSlice & AuthSlice, [], [], SettingsSlice> 

export type AuthCreator     = StateCreator<SettingsSlice & AuthSlice, [], [], AuthSlice>


export type Store = SettingsSlice & AuthSlice