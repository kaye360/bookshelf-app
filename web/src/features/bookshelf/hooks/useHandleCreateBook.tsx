import { SyntheticEvent, useState } from "react"
import { useStore } from "../../../store/store"
import { useCreateUserBook } from "../api/createUserBook"
import { ExternalApiBook } from "../../../types/types"


export default function useHandleCreateBook() {

    const { auth : { user, token } } = useStore()

    const query = useCreateUserBook()

    const [isBookAdded, setIsBookAdded]   = useState(false)
    const [errorMessage, setErorrMessage] = useState<string|null>(null)

    async function handleCreateBook(book: ExternalApiBook, e: SyntheticEvent) {

        e.preventDefault()

        if( isBookAdded || !user ) return null

        const isOwned = document.getElementById('isOwned') as HTMLInputElement
        const isRead  = document.getElementById('isRead') as HTMLInputElement
        
        query.mutate({user, book, isOwned, isRead, token})

        if( query.isError ) {
            setErorrMessage( query.error.message )

            setTimeout( () => { 
                setIsBookAdded(false) 
                setErorrMessage(null)
            }, 5000 )
            
        } else {
            setIsBookAdded(true)
        }
    }

    return {
        handleCreateBook,
        query,
        errorMessage,
        isBookAdded,
        setIsBookAdded
    }
}