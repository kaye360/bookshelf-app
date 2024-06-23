import { useEffect, useState } from "react"
import { useAuth } from "../../auth/hooks/useAuth"


export default function useCurrentlyReading() {

    const { user }            = useAuth()
    const [bookId, setBookId] = useState<string>('')

    useEffect( () => {
        if( user?.settings?.currentlyReadingId ) {
            setBookId( user.settings.currentlyReadingId )
        }
    }, [user?.settings])

    const book = user?.books.filter( book => book.id == bookId )[0]

    return {
        book,
        bookId,
        setBookId
    }
}
