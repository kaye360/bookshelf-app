import { Book } from "../../../types/types"
import { API_URL } from "../../../config"
import { isString } from "../../../utils/validation"
import { Req } from "../../../lib/Req/Req"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useStore } from "../../../store/store"


interface UpdateBookIsOwnedProps {
    book  : Book,
    isOwned : boolean
}


/**
 * 
 * The api query or mutation to be consumed across the app
 * 
 */
export function useUpdateBookIsOwned() {

    const client = useQueryClient()

    return useMutation({
        mutationKey : ['updateBookIsOwned'],
        mutationFn  : (props : UpdateBookIsOwnedProps) => updateIsOwned({...props}),
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
async function updateIsOwned(props : UpdateBookIsOwnedProps) {

    const token = useStore.getState().auth.token
    if( !isString(token) ) {
        throw new Error("Invalid User Token")
    }
    
    const { book, isOwned} = props

    const response = await Req.put({
        url: `${API_URL}/book/${book.id}`,
        payload : { group : isOwned ? 'wishlist' : 'owned'},
        token
    })

    return response
}