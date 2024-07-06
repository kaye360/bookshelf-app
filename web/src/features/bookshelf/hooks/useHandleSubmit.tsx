import { SyntheticEvent, useState } from "react"
import { useUserBooks } from "../api/getUserBooks"
import { useStore } from "../../../store/store"
import { useCreateUserBook } from "../api/createUserBook"
import { GoogleBook } from "../../../types/types"


export default function useHandleCreateBook({
    book,
} : {
    book : GoogleBook,
}) {

    const { auth : { user, token } } = useStore()

    const userBooks = useUserBooks()
    const isOwned = document.getElementById('isOwned') as HTMLInputElement
    const isRead  = document.getElementById('isRead') as HTMLInputElement

    const query = useCreateUserBook({user, book, isOwned, isRead, token})

    const [isBookAdded, setIsBookAdded]   = useState(false)
    const [errorMessage, setErorrMessage] = useState<string|null>(null)

    async function handleSubmit(e: SyntheticEvent) {

        e.preventDefault()

        if( isBookAdded || !user ) return null
        
        const response = await query.refetch()

        if( response.error ) {
            setErorrMessage( errorMessage )

            setTimeout( () => { 
                setIsBookAdded(false) 
                setErorrMessage(null)
            }, 5000 )
            
        } else {
            setIsBookAdded(true)
            userBooks.mutate()
        }

        return response
    }

    return {
        handleSubmit,
        query,
        errorMessage,
        isBookAdded,
        setIsBookAdded
    }
}