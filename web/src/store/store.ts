import { create } from "zustand";
import { getSettingsFromLocalStorage } from "../features/settings/api/getSettings";
import { getUserSessionFromLocalStorage } from "../features/auth/services/getUserSession";
import { authReducer } from "./authReducer";
import { Store } from "../types/types";


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
    }

})))