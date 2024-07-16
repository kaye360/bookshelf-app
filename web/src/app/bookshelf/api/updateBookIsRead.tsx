import { Book } from "../../../types/types"
import { API_URL } from "../../../config"
import { isString } from "../../../utils/validation"
import { Req } from "../../../lib/Req/Req"
import { useQueryClient, useMutation } from "@tanstack/react-query"


interface UpdateIsReadProps {
    token : string | null,
    book  : Book,
    isRead : boolean
}


/**
 * 
 * The api query or mutation to be consumed across the app
 * 
 */
export function useUpdateBookIsRead() {

    const client = useQueryClient()

    return useMutation({
        mutationKey : ['updateBookIsRead'],
        mutationFn  : (props : UpdateIsReadProps) => updateIsRead({...props}),
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
async function updateIsRead(props : UpdateIsReadProps) {

    const { token, book, isRead }  = props

    if( !isString(token) ) return {
        error : "Invalid User Token",
        data  : null,
        code  : 404
    }

    const response = await Req.put({
        url     : `${API_URL}/book/${book.id}`,
        payload : {isRead : !isRead},
        token
    })

    return response
}