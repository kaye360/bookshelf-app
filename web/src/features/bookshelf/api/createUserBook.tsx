import { API_URL } from "../../../config";
import { GoogleBook, User } from "../../../types/types";
import { Req } from "../../../lib/Req/Req";
import { createUserBookValidation } from "../validation/createUserBookValidation";
import { useMutation, useQueryClient } from "@tanstack/react-query";


interface CreateBookProps {
    book : GoogleBook,
    user : User|null,
    isOwned : HTMLInputElement,
    isRead  : HTMLInputElement,
    token? : string|null
}

 
export function useCreateUserBook() {

    const client = useQueryClient()

    return useMutation({
        mutationKey : ['createBook'],
        mutationFn  : (props : CreateBookProps) => createBook({...props}),
        onSuccess   : () => {
            client.invalidateQueries({
                queryKey : ['getUserBooks']
            })
        },
        onError : (error) => console.log({error})
    })
}


async function createBook(props : CreateBookProps ) {

    const { user, token } = props
    if( !user || !token ) return

    const validated = createUserBookValidation({...props})

    const response = await Req.post({
        url     : `${API_URL}/book`,
        payload : validated,
        token
    })

    return response
}