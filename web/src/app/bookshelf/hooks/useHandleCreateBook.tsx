import { SyntheticEvent, useState } from "react"
import { CreateBook } from "../../../types/types"
import { useCreateBook } from "../api/createBook"
import { useCreateCommunityPost } from "../../community/api/createCommunityPost"


export default function useHandleCreateBook() {

    const query     = useCreateBook()
    const community = useCreateCommunityPost()

    const [isBookAdded, setIsBookAdded]   = useState(false)
    const [errorMessage, setErorrMessage] = useState<string|null>(null)

    async function handleCreateBook(book: CreateBook, e: SyntheticEvent) {
        e.preventDefault()

        if( isBookAdded ) return null

        const isOwned = document.getElementById('isOwned') as HTMLInputElement
        const isRead  = document.getElementById('isRead') as HTMLInputElement

        console.log('handleCreateBook', book)
        
        query.mutate({ book, isOwned, isRead})

        if( query.isError ) {
            setErorrMessage( query.error.message )

            setTimeout( () => { 
                setIsBookAdded(false) 
                setErorrMessage(null)
            }, 5000 )
            
        } else {
            setIsBookAdded(true)
        }

        community.mutate({ book, type : 'CREATE_BOOK' })
    }

    return {
        handleCreateBook,
        query,
        errorMessage,
        isBookAdded,
        setIsBookAdded
    }
}