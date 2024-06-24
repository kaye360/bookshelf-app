import { ReactNode, useReducer } from "react"
import { AuthReducer } from "../services/reducer"
import { useQuery } from "@tanstack/react-query"
import { getUserData } from "../services/getUserData"
import { getUserSession } from "../services/getUserSession"
import { AuthContext } from "../hooks/useAuth"
import { AuthDispatchContext } from "../hooks/useAuthDispatch"


export default function AuthProvider({
    children
} : {
    children : ReactNode
}) {

    const userSession = getUserSession()

    const [user, dispatch] = useReducer(AuthReducer, userSession)

    const { refetch } = useQuery({ queryKey : ['userData', user.isAuth], queryFn : userQuery })
    userSession.updateUser = refetch

    async function userQuery() {
        const data = await getUserData(userSession)

        if( data.isAuth ) {
            dispatch({
                type : 'LOGIN_SUCCESS',
                payload : { 
                    user : data?.user,
                    auth_token : data?.token
                }
            })
        }

        return true
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
