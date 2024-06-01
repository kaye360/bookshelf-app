import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react"
import { AuthReducer } from "./reducer"
import { AuthReducerState } from "./types"
import { initialState } from "./reducerInitialState"
import { useQuery } from "@tanstack/react-query"
import { userBookQuery } from "./query"

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

    useQuery({ queryKey : ['userBooks'], queryFn : async() => {
        const data = await userBookQuery()
        dispatch({
            type : 'LOGIN_SUCCESS',
            payload : { 
                user : data?.user,
                auth_token : data?.token
            }
        })
        return data
    }})

    const [user, dispatch] = useReducer(AuthReducer, initialState);

	return (
        <AuthContext.Provider value={user}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    )
}
