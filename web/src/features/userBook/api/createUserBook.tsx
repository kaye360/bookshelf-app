import { useState } from "react";
import { API_URL } from "../../../config";
import { useStore } from "../../../store/store";
import { GoogleBook, User } from "../../../types/types";
import { Req } from "../../../lib/Req/Req";
import { createUserBookValidation } from "../validation/createUserBookValidation";
import { useUserBooks } from "./getUserBooks";
import { useQuery } from "@tanstack/react-query";


export default function useCreateUserBook({
    book
} : {
    book: GoogleBook
}) {

    const { auth : { user, token } } = useStore()
    const userBooks = useUserBooks()

    const [isBookAdded, setIsBookAdded]   = useState(false)
    const [errorMessage, setErorrMessage] = useState<string|null>(null)

    const query = useQuery({
        queryKey    : ['createBook'],
        queryFn     : handleSubmit,
        initialData : null,
        enabled     : false
    })

    async function handleSubmit() {

        console.log(1)
        if( isBookAdded || !user ) return null
        
        console.log(2)
        const isOwned = document.getElementById('isOwned') as HTMLInputElement
        const isRead  = document.getElementById('isRead') as HTMLInputElement
        
        const response = await createBook({book, user, isOwned, isRead, token})
        console.log(response)

        if( response.error ) {
            setErorrMessage( errorMessage )

            setTimeout( () => { 
                setIsBookAdded(false) 
                setErorrMessage(null)
            }, 5000 )
        } else {
            setIsBookAdded(true)
            userBooks.mutate()
        }

        return response
    }

    return {
        query,
        isBookAdded,
        setIsBookAdded,
        errorMessage
    }   
}



async function createBook({
    book, 
    user,
    isOwned,
    isRead,
    token = undefined
 } : {
    book : GoogleBook,
    user : User,
    isOwned : HTMLInputElement,
    isRead  : HTMLInputElement,
    token? : string
 } ) {

    const validated = createUserBookValidation({ book, user, isOwned, isRead })

    const response = await Req.post({
        url     : `${API_URL}/book`,
        payload : validated,
        token
    })

    return response
}