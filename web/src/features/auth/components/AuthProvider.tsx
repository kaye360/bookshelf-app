import { ReactNode, useReducer } from "react"
import { AuthReducer } from "../services/reducer"
import { useQuery } from "@tanstack/react-query"
import { userQuery } from "../services/userQuery"
import { getUserSession } from "../services/getUserSession"
import { AuthContext } from "../hooks/useAuth"
import { AuthDispatchContext } from "../hooks/useAuthDispatch"


interface AuthProviderProps {
    children : ReactNode
}


export default function AuthProvider( {children} : AuthProviderProps ) {

    const userSession = getUserSession()

    const [user, dispatch] = useReducer(AuthReducer, userSession)

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
        <>
            <AuthContext.Provider value={user}>
                <AuthDispatchContext.Provider value={dispatch}>
                    {children}
                </AuthDispatchContext.Provider>
            </AuthContext.Provider>
        </>
    )
}
