import { Book } from "../../../types/types"
import { API_URL } from "../../../config"
import { isString } from "../../../utils/validation"
import { Req } from "../../../lib/Req/Req"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useStore } from "../../../store/store"


interface UpdateIsReadProps {
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

    const token = useStore.getState().auth.token
    if( !isString(token) ) {
        throw new Error("Invalid User Token")
    }

    const { book, isRead }  = props

    const response = await Req.put({
        url     : `${API_URL}/book/${book.id}`,
        payload : {isRead : !isRead},
        token
    })

    return response
}