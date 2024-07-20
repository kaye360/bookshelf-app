import { API_URL } from "../../../config"
import { Book } from "../../../types/types"
import { isString } from "../../../utils/validation"
import { Req } from "../../../lib/Req/Req"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useStore } from "../../../store/store"


interface UpdateBookTagsProps {
    book  : Book,
    tags  : string[]
}


/**
 * 
 * The api query or mutation to be consumed across the app
 * 
 */
export function useUpdateBookTags() {

    const client = useQueryClient()

    return useMutation({
        mutationKey : ['updateBookTags'],
        mutationFn  : ({book, tags} : UpdateBookTagsProps) => updateTags({book, tags}),
        onSuccess   : () => client.invalidateQueries({
            queryKey : ['getBooks']
        })
    })
}


/**
 * 
 * The function containing the request and response.
 * Only to be used in the above hook
 * @returns a validated response or throws an error
 * 
 */
async function updateTags(props : UpdateBookTagsProps) {

    const token = useStore.getState().auth.token
    if( !isString(token) ) {
        throw new Error("Invalid User Token")
    }

    const { book, tags } = props

    const response = await Req.put({
        url     : `${API_URL}/book/${book.id}`,
        payload : { tags: JSON.stringify( tags ) },
        token
    })
    return response
}