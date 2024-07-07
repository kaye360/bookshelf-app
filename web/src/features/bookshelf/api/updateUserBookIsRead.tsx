import { UserBook } from "../../../types/types"
import { API_URL } from "../../../config"
import { isString } from "../../../utils/validation"
import { Req } from "../../../lib/Req/Req"
import { useQueryClient, useMutation } from "@tanstack/react-query"


interface UpdateIsReadProps {
    token : string | null,
    book  : UserBook,
    isRead : boolean
}


export function useUpdateUserBookIsRead() {

    const client = useQueryClient()

    return useMutation({
        mutationKey : ['updateBookIsRead'],
        mutationFn  : (props : UpdateIsReadProps) => updateIsRead({...props}),
        onSuccess   : () => client.invalidateQueries({
            queryKey : ['getUserBooks']
        })
    })

}


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