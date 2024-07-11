import { API_URL } from "../../../config"
import { UserBook } from "../../../types/types"
import { isString } from "../../../utils/validation"
import { Req } from "../../../lib/Req/Req"
import { useMutation, useQueryClient } from "@tanstack/react-query"


interface UpdateBookTagsProps {
    token : string|null,
    book  : UserBook,
    tags  : string[]
}


/**
 * 
 * The api query or mutation to be consumed across the app
 * 
 */
export function useUpdateUserBookTags() {

    const client = useQueryClient()

    return useMutation({
        mutationKey : ['updateBookTags'],
        mutationFn  : ({token, book, tags} : UpdateBookTagsProps) => updateTags({token, book, tags}),
        onSuccess   : () => client.invalidateQueries({
            queryKey : ['getUserBooks']
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

    const { token, book, tags } = props

    if( !isString(token) ) return {
        error : "Invalid User Token",
        data  : null,
        code  : 404
    }

    const response = await Req.put({
        url     : `${API_URL}/book/${book.id}`,
        payload : { tags: JSON.stringify( tags ) },
        token
    })
    return response
}