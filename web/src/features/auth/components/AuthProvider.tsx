import { ReactNode, useReducer } from "react"
import { AuthReducer } from "../services/reducer"
import { useQuery } from "@tanstack/react-query"
import { getUserData } from "../services/getUserData"
import { getUserSession } from "../services/getUserSession"
import { AuthContext } from "../hooks/useAuth"
import { AuthDispatchContext } from "../hooks/useAuthDispatch"


interface AuthProviderProps {
    children : ReactNode
}


export default function AuthProvider( {children} : AuthProviderProps ) {

    const userSession = getUserSession()

    const [user, dispatch] = useReducer(AuthReducer, userSession)

    async function userQuery() {
        const data = await getUserData(userSession)

        dispatch({
            type : 'LOGIN_SUCCESS',
            payload : { 
                user : data?.user,
                auth_token : data?.token
            }
        })
    }

    const { refetch } = useQuery({ queryKey : ['userBooks'], queryFn : userQuery })
    userSession.updateUser = refetch

	return (
        <>
            <AuthContext.Provider value={user}>
                <AuthDispatchContext.Provider value={dispatch}>
                    {children}
                </AuthDispatchContext.Provider>
            </AuthContext.Provider>
        </>
    )
}
