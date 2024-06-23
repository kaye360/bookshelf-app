import { useState, SyntheticEvent } from "react"
import { UserBook } from "../../book/types/types"
import { API_URL } from "../../../config"
import { useAuth } from "../../auth/hooks/useAuth"
import { Req } from "../../../utils/req"

export default function useDeleteBook(book: UserBook) {

    const { updateUser, token } = useAuth()

    const defaultStatus = { isLoading : false, isSuccess : false }
    const [status, setStatus] = useState(defaultStatus)

    async function deleteBook(book: UserBook) {
        const response = await Req.send({
            url: `${API_URL}/book/${book.id}`,
            method: 'DELETE',
            token
        })
        return response
    }

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        setStatus( prev => ({...prev, isLoading : true}) )
        const query = await deleteBook(book)

        setStatus( prev => ({...prev, isLoading : false}))

        if( !query.error ) {
            setStatus( prev => ({...prev, isSuccess : true}) )
            setTimeout( () => {
                setStatus(defaultStatus)
                updateUser()
            }, 3000 )
        }
    }
    
    return {
        handleSubmit,
        status
    }
}
