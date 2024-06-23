import { AuthReducerState } from "../types/types"


export function getUserSession() : AuthReducerState {

    const userLocalStorage = localStorage.getItem("currentUser")
    const isUserSet        = typeof userLocalStorage === 'string'
    const userSession      = isUserSet ? JSON.parse( userLocalStorage ) : null

    const user  = isUserSet ? userSession.user         : null
    const token = isUserSet ? userSession.access_token : null

    const isAuth = user !== null && token !== null
    
    const initialState : AuthReducerState = {
        user,
        token,
        loading: false,
        errorMessage: null,
        isAuth,
        updateUser : () => {}
    }

    return initialState
}
