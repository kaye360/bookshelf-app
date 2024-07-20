import { API_URL } from "../../../config"
import { Book } from "../../../types/types"
import { isString } from "../../../utils/validation"
import { Req } from "../../../lib/Req/Req"
import { ReqResponse } from "../../../lib/Req/Req.type"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useStore } from "../../../store/store"


interface DeleteBookProps {
    book  : Book, 
}


/**
 * 
 * The api query or mutation to be consumed across the app
 * 
 */
export function useDeleteBook() {

    const client = useQueryClient()

    return useMutation({
        mutationKey : ['deleteBook'],
        mutationFn  : (props : DeleteBookProps) => deleteBook({...props}),
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
async function deleteBook({book} : DeleteBookProps) : Promise<ReqResponse> {

    const token = useStore.getState().auth.token
    if( !isString(token) ) {
        throw new Error('Invalid user token')
    }

    const response  = await Req.delete({ url: `${API_URL}/book/${book.id}`, token })
    return response
}