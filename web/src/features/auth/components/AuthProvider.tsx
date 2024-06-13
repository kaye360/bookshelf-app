import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react"
import { AuthReducer } from "../services/reducer"
import { AuthReducerState } from "../types/types"
import { useQuery } from "@tanstack/react-query"
import { getUserSession } from "../services/getUserSession"
import { userQuery } from "../services/userQuery"

interface AuthProviderProps {
    children : ReactNode
}

let userSession = getUserSession()

export const AuthContext         = createContext<AuthReducerState>(userSession)
export const AuthDispatchContext = createContext<Dispatch<any> | null>(null)


export function useAuth () {
    return useContext(AuthContext)
}

export function useAuthDispatch() {
    return useContext(AuthDispatchContext)
}


export default function AuthProvider( {children} : AuthProviderProps ) {

    const [user, dispatch] = useReducer(AuthReducer, userSession);

    if( userSession.isAuth ) {

        const { refetch } = useQuery({ queryKey : ['userBooks'], queryFn : async() => {

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

        userSession.updateUser = refetch
    }

    
	return (
        <AuthContext.Provider value={user}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    )
}
