import { getUserSession } from "../features/auth/services/getUserSession";
import { isLoading, isLoggedIn, isLoggedOut, isLoginError, isRegisterError, isRegistered } from "./authActions";
import { AuthCreator } from "./types";


export const authSlice: AuthCreator = (set) => ({ 

    auth : getUserSession(),
    
    actions : {
        updateAuth : (action, user, token) => {
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
        },
    }
})