import { createContext, Dispatch, useContext } from "react"


export const AuthDispatchContext = createContext<Dispatch<any> | null>(null)


export function useAuthDispatch() {
    return useContext(AuthDispatchContext)
}
