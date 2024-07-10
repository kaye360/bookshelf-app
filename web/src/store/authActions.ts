import { AuthLoading, AuthSuccess, AuthError, User, WithoutAuth } from "../types/types"


export function isLoading() : AuthLoading {
    return {
        user : null,
        token : null,
        error : null,
        isAuth : false
    }
}


export function isLoggedIn({
    user,
    token
} : {
    user: User, 
    token : string
}) : AuthSuccess {
    return {
        user,
        token,
        error : null,
        isAuth : true
    }
}


export function isLoginError() : AuthError {
    return {
        user : null,
        token : null,
        error : 'LOGIN',
        isAuth : false
    }
}

export function isRegisterError() : AuthError {
    return {
        user : null,
        token : null,
        error : 'REGISTER',
        isAuth : false
    }
}


export function isLoggedOut() : WithoutAuth {
    return {
        user    : null,
        token   : null,
        error   : null,
        isAuth  : false,
    }
}