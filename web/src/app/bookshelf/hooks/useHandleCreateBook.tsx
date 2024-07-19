import { SyntheticEvent, useState } from "react"
import { useStore } from "../../../store/store"
import { CreateBook } from "../../../types/types"
import { useCreateBook } from "../api/createBook"
import { useCreateCommunityPost } from "../../community/api/createCommunityPost"


export default function useHandleCreateBook() {

    const { auth : { user, token } } = useStore()

    const query = useCreateBook()

    const communityQuery = useCreateCommunityPost()

    const [isBookAdded, setIsBookAdded]   = useState(false)
    const [errorMessage, setErorrMessage] = useState<string|null>(null)

    async function handleCreateBook(book: CreateBook, e: SyntheticEvent) {
        e.preventDefault()

        if( isBookAdded || !user ) return null

        const isOwned = document.getElementById('isOwned') as HTMLInputElement
        const isRead  = document.getElementById('isRead') as HTMLInputElement
        
        query.mutate({user, book, isOwned, isRead, token})

        communityQuery.mutate({
            userId     : user.id,
            userHandle : user.handle,
            type       : 'CREATE_BOOK',
            imageUrl   : book.imageUrl,
            title      : book.title || '',
            token
        })

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