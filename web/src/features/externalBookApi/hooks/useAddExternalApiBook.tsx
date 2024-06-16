import { useState } from "react";
import { GoogleBook } from "../../book/types/types";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../../config";
import { useAuth } from "../../auth/hooks/useAuth";
import useFetch from "../../../hooks/useFetch";
import { formatPayload } from "../services/formatPayload";


export default function useAddExternalApiBook({book} : {book: GoogleBook}) {

    const [showAddBookModal, setShowAddBookModal] = useState(false)
    const [isBookAdded, setIsBookAdded]           = useState(false)
    const [errorMessage, setErorrMessage]         = useState<string|null>(null)

    const { user, updateUser } = useAuth()
    const { fetchApi }         = useFetch()

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

            const response = await fetchApi({
                url     : `${API_URL}/book`,
                method  : 'POST',
                auth    : true,
                payload : formatPayload({book, user, isOwned, isRead})
            })

            updateUser()

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
        showAddBookModal,
        setShowAddBookModal,
        isBookAdded,
        setIsBookAdded,
        query,
        errorMessage
    }   
}

