import { AuthReducerState } from "../types/types"
import { getUserBooks } from "./getUsersBooks"


export async function userQuery( userSession : AuthReducerState) {

    if( !userSession.user?.id ) return userSession

    const books = await getUserBooks(userSession.user.id)

    userSession.user.books = books

    return userSession
}