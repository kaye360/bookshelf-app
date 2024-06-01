import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react"
import { AuthReducer } from "./reducer"
import { AuthReducerState } from "./types"
import { useQuery } from "@tanstack/react-query"
import { getUserSession } from "./getUserSession"
import { userQuery } from "./query"

interface AuthProviderProps {
    children : ReactNode
}

const userSession = getUserSession()

export const AuthContext         = createContext<AuthReducerState>(userSession)
export const AuthDispatchContext = createContext<Dispatch<any> | null>(null)


export function useAuth () {
    return useContext(AuthContext)
}

export function useAuthDispatch() {
    return useContext(AuthDispatchContext)
}


export default function AuthProvider( {children} : AuthProviderProps ) {

    if( userSession.isAuth ) {

        useQuery({ queryKey : ['userBooks'], queryFn : async() => {

            const data = await userQuery(userSession)

            dispatch({
                type : 'LOGIN_SUCCESS',
                payload : { 
                    user : data?.user,
                    auth_token : data?.token
                }
            })

            return data
        }})

    }

    const [user, dispatch] = useReducer(AuthReducer, userSession);

	return (
        <AuthContext.Provider value={user}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    )
}
