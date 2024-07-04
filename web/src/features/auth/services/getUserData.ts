import { Auth } from "../../../types/types"
import { getUserSettings } from "./getUserSettings"
import { getUserBooks } from "./getUsersBooks"


export async function getUserData( userSession : Auth) {

    if( !userSession.user?.id ) return userSession

    const [books, settings] = await Promise.allSettled([
        getUserBooks(userSession.user.id),
        getUserSettings(userSession.token)
    ])

    if(books.status === 'fulfilled') {
        userSession.user.books = books.value
    }

    if(settings.status === 'fulfilled') {
        userSession.user.settings = settings.value
    }

    return userSession
} 