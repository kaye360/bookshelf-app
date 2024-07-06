import { API_URL } from "../../../config";
import { GoogleBook, User } from "../../../types/types";
import { Req } from "../../../lib/Req/Req";
import { createUserBookValidation } from "../validation/createUserBookValidation";
import { useQuery } from "@tanstack/react-query";


interface CreateBookProps {
    book : GoogleBook,
    user : User|null,
    isOwned : HTMLInputElement,
    isRead  : HTMLInputElement,
    token? : string|null
}

 
export function useCreateUserBook(props : CreateBookProps) {

    return useQuery({
        queryKey    : ['createBook'],
        queryFn     : () => createBook({...props}),
        initialData : null,
        enabled     : false
    })
}


async function createBook(props : CreateBookProps ) {

    if( !props.user || !props.token ) return

    const validated = createUserBookValidation({...props})

    const response = await Req.post({
        url     : `${API_URL}/book`,
        payload : validated,
        token   : props.token
    })

    return response
}