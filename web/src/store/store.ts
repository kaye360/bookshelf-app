import { create } from "zustand";
import { getUserSessionFromLocalStorage } from "../app/auth/services/getUserSession";
import { authReducer } from "./authReducer";
import { Store } from "../types/types";
import { getSettingsFromLocalStorage } from "../app/settings/services/settingsService";


export const useStore = create<Store>()((set => ({

    auth : getUserSessionFromLocalStorage(),

    authActions : {
        updateAuth : (action, user, token) => authReducer(set, action, user, token),
    },

    books : [],

    booksStatus : 'LOADING',

    booksActions : {
        updateBooks : (newBooks) => set({books : newBooks}),
        updateBookStatus : (newStatus) => set({booksStatus : newStatus})
    },

    settings : getSettingsFromLocalStorage(),

    settingsActions : {
        updateSettings : (newSettings) => set({ settings : newSettings })
    },

    tooltip : null,
    updateTooltip : (newTooltip) => set({ tooltip : newTooltip })

})))