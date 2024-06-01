import { AuthReducerState } from "./types"

const currentUserLocalStorage = localStorage.getItem("currentUser")

const user = typeof currentUserLocalStorage === 'string'
    ? JSON.parse(currentUserLocalStorage).user
    : null

const token = typeof currentUserLocalStorage === 'string'
    ? JSON.parse(currentUserLocalStorage).auth_token
    : null

const isAuth = user !== null && token !== null


if( user ) {
    user.books = []
}

export const initialState : AuthReducerState = {
    user,
    token,
    loading: false,
    errorMessage: null,
    isAuth,
}
