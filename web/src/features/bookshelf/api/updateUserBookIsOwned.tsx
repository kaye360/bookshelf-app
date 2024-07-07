import { UserBook } from "../../../types/types"
import { API_URL } from "../../../config"
import { isString } from "../../../utils/validation"
import { Req } from "../../../lib/Req/Req"
import { useMutation, useQueryClient } from "@tanstack/react-query"


interface UpdateBookIsOwnedProps {
    token : string | null,
    book  : UserBook,
    isOwned : boolean
}


export function useUpdateUserBookIsOwned() {

    const client = useQueryClient()

    return useMutation({
        mutationKey : ['updateBookIsOwned'],
        mutationFn  : (props : UpdateBookIsOwnedProps) => updateIsOwned({...props}),
        onSuccess   : () => client.invalidateQueries({
            queryKey : ['getUserBooks']
        })
    })
}


async function updateIsOwned(props : UpdateBookIsOwnedProps) {

    const { token, book, isOwned} = props

    if( !isString(token) ) return {
        error : "Invalid User Token",
        data  : null,
        code  : 404
    }

    const response = await Req.put({
        url: `${API_URL}/book/${book.id}`,
        payload : { group : isOwned ? 'wishlist' : 'owned'},
        token
    })

    return response
}