import { createContext, useContext } from "react"
import { AuthReducerState } from "../types/types"
import { getUserSession } from "../services/getUserSession"


let userSession = getUserSession()


export const AuthContext = createContext<AuthReducerState>(userSession)


export function useAuth () {
    return useContext(AuthContext)
}