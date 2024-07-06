import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../../config";
import { formatPayload } from "../services/formatPayload";
import { useStore } from "../../../store/store";
import { GoogleBook } from "../../../types/types";
import { Req } from "../../../lib/Req/Req";


export default function useAddExternalApiBook({
    book
} : {
    book: GoogleBook
}) {

    const [isBookAdded, setIsBookAdded]   = useState(false)
    const [errorMessage, setErorrMessage] = useState<string|null>(null)

    const { auth : { user, token } } = useStore()

    const query = useQuery({
        queryKey : ['addGoogleBook', book.id, isBookAdded],
        queryFn : addGoogleBook
    })

    async function addGoogleBook() {
        if( !isBookAdded ) return null

        const isOwned = document.getElementById('isOwned') as HTMLInputElement
        const isRead  = document.getElementById('isRead') as HTMLInputElement

        try {

            if( !user?.id ) {
                throw new Error('User ID is not valid')
            }

            const response = await Req.post({
                url     : `${API_URL}/book`,
                payload : formatPayload({book, user, isOwned, isRead}),
                token
            })

            throw new Error('Function not implemeneted')

            return response
        } catch (e: any) {

            const errorMessage = e.message && typeof e.message === 'string' && e.message || 'Something went wrong. Please try again'
            setErorrMessage( errorMessage )

            setTimeout( () => { 
                setIsBookAdded(false) 
                setErorrMessage(null)
            }, 5000 )
        }
    }

    return {
        isBookAdded,
        setIsBookAdded,
        query,
        errorMessage
    }   
}

