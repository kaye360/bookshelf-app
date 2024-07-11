import { UserBook } from "../../../types/types"
import { API_URL } from "../../../config"
import { isString } from "../../../utils/validation"
import { Req } from "../../../lib/Req/Req"
import { useMutation, useQueryClient } from "@tanstack/react-query"


interface UpdateBookIsFavouriteProps {
    token : string | null,
    book  : UserBook,
    isFavourite : boolean
}


/**
 * 
 * The api query or mutation to be consumed across the app
 * 
 */
export function useUpdateUserBookIsFavourite() {

    const client = useQueryClient()

    return useMutation({
        mutationKey : ['updateBookIsFavourite'],
        mutationFn  : (props : UpdateBookIsFavouriteProps) => updateIsFavourite({...props}),
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
async function updateIsFavourite(props : UpdateBookIsFavouriteProps) {

    const { token, book, isFavourite } = props

    if( !isString(token) ) return {
        error : "Invalid User Token",
        data  : null,
        code  : 404
    }

    const response = await Req.put({
        url     : `${API_URL}/book/${book.id}`,
        payload : {isFavourite : !isFavourite},
        token
    })

    return response
}