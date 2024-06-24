import { UserBook } from "../../book/types/types"
import { Settings } from "../../settings/types/types"

export interface User {
    id          : string
    name        : string
    handle      : string  
    email       : string 
    settings    : Settings | null
    books       : UserBook[]
    updateUser  : Function
}

export type AuthError = 'LOGIN' | 'REGISTER' | null

interface AuthReducerStateWithAuth {
    user            : User,
    token           : string,
    loading         : boolean,
    errorMessage    : AuthError
    isAuth          : true
    updateUser      : Function
}

interface AuthReducerStateNoAuth {
    user            : null,
    token           : undefined,
    loading         : boolean,
    errorMessage    : AuthError
    isAuth          : false
    updateUser      : Function
}

export type AuthReducerState = AuthReducerStateWithAuth | AuthReducerStateNoAuth

export interface AuthReducerAction { 
    type            : any
    payload?        : { 
        user        : any
        auth_token  : any
    }
    error?          : any
}

export type LoginDispatch = ((arg0: AuthReducerAction) => void) | null

export interface LoginPayload {
    handle   : string 
    password : string
}

export type RegisterDispatch = ((arg0: AuthReducerAction) => void) | null

export interface RegisterPayload {
    handle          : string
    email           : string
    name            : string
    password        : string
    password_confirmation : string
}