import { getUserBooks } from "../book/getUsersBooks"
import { AuthReducerState } from "./types"


export async function userQuery( userSession : AuthReducerState) {

    if( !userSession.user?.id ) return userSession

    const books = await getUserBooks(userSession.user.id)

    userSession.user.books = books

    return userSession
}