import { Auth } from "../../../types/types"


export function getUserSessionFromLocalStorage() : Auth {

    const userLocalStorage = localStorage.getItem("auth")
    const isUserSet        = isValidSession(userLocalStorage)
    const userSession      = isUserSet ? JSON.parse( userLocalStorage ) : null

    const user  = isUserSet && Object.hasOwn(userSession, 'user') 
                    ? userSession.user 
                    : null

    const token = isUserSet && Object.hasOwn(userSession, 'token')  
                    ? userSession.token
                    : null

    const isAuth = user !== null && token !== null

    const initialState : Auth = {
        user,
        token,
        loading : false,
        error   : null,
        isAuth,
    }

    return initialState
}



function isValidSession(userLocalStorage : string|null) : userLocalStorage is string {

    if( typeof userLocalStorage !== 'string') return false

    try {
        const json = JSON.parse(userLocalStorage)
        if( typeof json === 'object') return true
    }
    catch (e) {}

    return false
}