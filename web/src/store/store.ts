import { create } from "zustand";
import { getUserSessionFromLocalStorage } from "../app/auth/services/getUserSession";
import { authReducer } from "./authReducer";
import { Store } from "../types/types";
import { getDefaultSettings } from "../app/settings/services/getDefaultSettings";


export const useStore = create<Store>()((set => ({

    auth : getUserSessionFromLocalStorage(),

    authActions : {
        updateAuth : (action, user, token) => authReducer(set, action, user, token),
    },

    books : [],

    booksStatus : 'LOADING',

    booksActions : {
        updateBooks : (newBooks) => set({books : newBooks}),
        updateBookStatus : (newStatus) => set({booksStatus : newStatus}),
        clearBooks : () => set( () => ({books : []}))
    },

    settings : getDefaultSettings(),

    settingsStatus : 'LOADING',

    settingsActions : {
        updateSettings : (newSettings) => set({ settings : newSettings }),
        updateSettingsStatus : (newStatus) => set({settingsStatus : newStatus}),
    },

})))