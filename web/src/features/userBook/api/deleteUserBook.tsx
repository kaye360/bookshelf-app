import { useState, SyntheticEvent } from "react"
import { API_URL } from "../../../config"
import { UserBook } from "../../../types/types"
import { isString } from "../../../utils/validation"
import { useUserBooks } from "./getUserBooks"
import { useStore } from "../../../store/store"
import { Req } from "../../../lib/Req/Req"
import { ReqResponse } from "../../../lib/Req/Req.type"


export function useDeleteUserBook() {

    const { auth : {token} } = useStore()
    const userBooks = useUserBooks()

    const initialStatus = { isLoading : false, isSuccess : false }
    const [status, setStatus] = useState(initialStatus)

    async function handleSubmit(book: UserBook, e: SyntheticEvent) {
        e.preventDefault()

        setStatus( prev => ({...prev, isLoading : true}) )

        const query = await deleteBook(book, token)
        userBooks.mutate()

        setStatus( prev => ({...prev, isLoading : false}))

        if( !query.error ) {
            setStatus( prev => ({...prev, isSuccess : true}) )
            setTimeout( () => {
                setStatus(initialStatus)
            }, 3000 )
        }
    }
    
    return {
        handleSubmit,
        status    
    }
}


async function deleteBook(book : UserBook, token : string|null) : Promise<ReqResponse> {

    if( !isString(token) ) return {
        error : "Invalid User Token",
        data  : null,
        code  : 404
    }

    const response  = await Req.delete({ url: `${API_URL}/book/${book.id}`, token })

    return response
}