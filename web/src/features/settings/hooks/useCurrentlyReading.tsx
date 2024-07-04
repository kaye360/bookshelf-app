import { useEffect, useState } from "react"
import { useStore } from "../../../store/store"


export default function useCurrentlyReading() {

    const { auth : { user } } = useStore()
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
