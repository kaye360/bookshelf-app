import { create } from "zustand";
import { settingsSlice } from "./settingsSlice";
import { authSlice } from "./authSlice";
import { Store } from "./types";


export const useStore = create<Store>()((...a) => ({
    ...settingsSlice( ...a ),
    ...authSlice( ...a )
}))