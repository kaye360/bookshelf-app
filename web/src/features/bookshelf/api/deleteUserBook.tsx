import { API_URL } from "../../../config"
import { UserBook } from "../../../types/types"
import { isString } from "../../../utils/validation"
import { Req } from "../../../lib/Req/Req"
import { ReqResponse } from "../../../lib/Req/Req.type"
import { useMutation, useQueryClient } from "@tanstack/react-query"


interface DeleteBookProps {
    book  : UserBook, 
    token : string|null
}


export function useDeleteUserBook() {

    const client = useQueryClient()

    return useMutation({
        mutationKey : ['deleteBook'],
        mutationFn  : (props : DeleteBookProps) => deleteBook({...props}),
        onSuccess   : () => client.invalidateQueries({
            queryKey : ['getUserBooks']
        })
    })
}


async function deleteBook({token, book} : DeleteBookProps) : Promise<ReqResponse> {

    if( !isString(token) ) return {
        error : "Invalid User Token",
        data  : null,
        code  : 404
    }

    const response  = await Req.delete({ url: `${API_URL}/book/${book.id}`, token })
    return response
}