import { SyntheticEvent, useState } from "react"
import { useStore } from "../../../store/store"
import { useUserBooks } from "./getUserBooks"
import { API_URL } from "../../../config"
import { Req } from "../../../utils/req"
import { UserBook } from "../../../types/types"
import { isString } from "../../../utils/validation"



export function useUpdateUserBookTags() {

    const { auth : {token} } = useStore()
    const userBooks = useUserBooks()
    
    const defaultStatus = { isLoading : false, isSuccess : false }
    const [status, setStatus] = useState(defaultStatus)

    async function handleSubmit(book : UserBook, e: SyntheticEvent) {
        e.preventDefault()

        if( !isString(token) ) return

        setStatus( prev => ({...prev, isLoading : true}) )

        const tagsInput = document.querySelector('#book-tags-textarea') as HTMLTextAreaElement
        const tags      = extractTagsFromInput(tagsInput)

        const query     = await updateTags({token, tags, book})

        setStatus( prev => ({...prev, isLoading : false}))
        userBooks.mutate()

        if( !query.error ) {
            setStatus( prev => ({...prev, isSuccess : true}) )
            setTimeout( () => setStatus(defaultStatus), 5000 )
        }
    }

    return {
        handleSubmit,
        status
    }
}



function extractTagsFromInput(input : HTMLTextAreaElement) : string[] {

    const tags      = new Set( input.value.trim().toLowerCase().split(' ').filter( tag => tag !== "") )
    const tagsArray = Array.from( tags )

    return tagsArray
}



async function updateTags({
    token,
    book,
    tags,
} : {
    token : string,
    book  : UserBook,
    tags  : string[]
}) {

    if( !isString(token) ) return {
        error : "Invalid User Token",
        data  : null,
        code  : 404
    }

    const response = await Req.send({
        url: `${API_URL}/book/${book.id}`,
        method: 'PUT',
        payload : { tags: JSON.stringify( tags ) },
        token
    })
    return response
}