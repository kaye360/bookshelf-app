import { AuthReducerState } from "./types"


export function getUserSession() : AuthReducerState {

    const userLocalStorage = localStorage.getItem("currentUser")
    const isUserSet        = typeof userLocalStorage === 'string'
    const userSession      = isUserSet ? JSON.parse( userLocalStorage ) : null
    
    const user  = isUserSet ? userSession.user       : null
    const token = isUserSet ? userSession.auth_token : null
    
    const isAuth = user !== null && token !== null
    
    if( user ) {
        user.books = []
    }
    
    const initialState : AuthReducerState = {
        user,
        token,
        loading: false,
        errorMessage: null,
        isAuth,
    }

    return initialState
}
