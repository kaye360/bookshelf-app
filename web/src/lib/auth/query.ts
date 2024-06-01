import { getUserBooks } from "../book/getUsersBooks"
import { initialState } from "./reducerInitialState"


export async function userBookQuery() {

    const books = await getUserBooks(initialState.user?.id as string)

    const auth = initialState

    if( auth.user ) {
        auth.user.books = books
    }

    return auth
}