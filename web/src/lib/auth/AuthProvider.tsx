import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react"
import { AuthReducer } from "./reducer"
import { AuthReducerState } from "./types"
import { initialState } from "./reducerInitialState"

interface AuthProviderProps {
    children : ReactNode
}

export const AuthContext         = createContext<AuthReducerState>(initialState)
export const AuthDispatchContext = createContext<Dispatch<any> | null>(null)


export function useAuth () {
    return useContext(AuthContext)
}

export function useAuthDispatch() {
    return useContext(AuthDispatchContext)
}


export default function AuthProvider( {children} : AuthProviderProps ) {

    const [user, dispatch] = useReducer(AuthReducer, initialState);

	return (
        <AuthContext.Provider value={user}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    )
}