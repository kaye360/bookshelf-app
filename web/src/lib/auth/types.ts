import { UserBook } from "../book/types"

export interface User {
    id        : string
    name      : string
    handle    : string  
    email     : string 
    settings  : Settings
    books     : UserBook[]
}

export interface Settings {
    theme : 'light' | 'dark'
    order : 'alphabetical' | 'uploadedAsc' | 'uploadedDesc'
}

interface AuthReducerStateIsAuth {
    user: User,
    token: string,
    loading: boolean,
    errorMessage: string | null
    isAuth : true
}

interface AuthReducerStateNoAuth {
    user: null,
    token: null,
    loading: boolean,
    errorMessage: string | null
    isAuth : false
}

export type AuthReducerState = AuthReducerStateIsAuth | AuthReducerStateNoAuth

export interface AuthReducerAction { 
    type: any
    payload?: { 
        user: any
        auth_token: any
    };
    error?: any
}

export type LoginDispatch = ((arg0: AuthReducerAction) => void) | null

export interface LoginPayload {
    handle: string 
    password: string
}

export type RegisterDispatch = ((arg0: AuthReducerAction) => void) | null

export interface RegisterPayload {
    handle          : string
    email           : string
    name            : string
    password        : string
    confirmPassword : string
}