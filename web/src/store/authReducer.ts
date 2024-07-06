import { AuthActions, User } from "../types/types"
import { isLoading, isLoggedIn, isRegistered, isLoginError, isRegisterError, isLoggedOut } from "./authActions"


export function authReducer(
    set    : Function,
    action : AuthActions,
    user   : User | undefined,
    token  : string | undefined
) {
    switch (action) {

        case 'LOADING':
            set( () => ({ auth : isLoading() }))
            break
            
        case 'LOGIN':
            if( user !== undefined && typeof token === 'string' ) {
                set( () => ({ auth : isLoggedIn({user, token}) }))
            }
            break

        case 'REGISTER':
            if( user !== undefined && typeof token === 'string' ) {
                set( () => ({ auth : isRegistered({user, token}) }))
            }
            break
        
        case 'LOGIN_ERROR':
            set( () => ({ auth : isLoginError() }))
            break

        case 'REGISTER_ERROR':
            set( () => ({ auth : isRegisterError() }))
            break

        case 'LOGOUT':
            set( () => ({ auth : isLoggedOut() }))
    }
}