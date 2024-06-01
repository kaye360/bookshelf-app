import { AuthReducerAction, AuthReducerState } from "./types";

export const AuthReducer = (state : AuthReducerState, action: AuthReducerAction) => {

    switch (action.type) {

        case "REQUEST_LOGIN":
            return {
                ...state,
                errorMessage : null,
                loading: true
            }

        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.payload?.user,
                token: action.payload?.auth_token,
                loading: false,
                isAuth : true
            }

        case "LOGIN_ERROR":
            return {
                ...state,
                loading: false,
                errorMessage: action?.error
            }

        case "LOGOUT":
            return {
                ...state,
                user: null,
                token: null,
                isAuth : false
            }

        case "REQUEST_REGISTER":
            return {
                ...state,
                errorMessage : null,
                loading: true
            }

        case "REGISTER_SUCCESS":
            return {
                ...state,
                user: action.payload?.user,
                token: action.payload?.auth_token,
                loading: false,
                isAuth : true
            }

        case "REGISTER_ERROR":
            return {
                ...state,
                loading: false,
                errorMessage: action?.error
            }

        default:
            return state
    }
};