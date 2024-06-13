import { useState } from "react";
import { GoogleBook } from "../../book/types/types";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../../config";
import { useAuth } from "../../auth/components/AuthProvider";

export default function useResult({book} : {book: GoogleBook}) {

    const [showAddBookModal, setShowAddBookModal] = useState(false)
    const [isBookAdded, setIsBookAdded] = useState(false)

    const { user, updateUser } = useAuth()

    const query = useQuery({
        queryKey : ['addGoogleBook', book.id, isBookAdded],
        queryFn : addGoogleBook
    })

    async function addGoogleBook() {
        if( !isBookAdded ) return null

        const isOwned =  document.getElementById('isOwned') as HTMLInputElement
        const isRead  =  document.getElementById('isRead') as HTMLInputElement

        try {

            if( !user?.id ) {
                throw new Error('User ID is not valid')
            }

            const payload = {
                title       : book.volumeInfo.title || '',
                isbn10      : book.volumeInfo.industryIdentifiers?.filter( id => id.type === 'ISBN_10' )[0]?.identifier || '',
                isbn13      : book.volumeInfo.industryIdentifiers?.filter( id => id.type === 'ISBN_13' )[0]?.identifier || '',
                imageUrl    : book.volumeInfo.imageLinks?.thumbnail || book.volumeInfo.imageLinks?.smallThumbnail || '',
                userId      : user.id,
                rating      : 0,
                group       : isOwned.checked ? 'owned' : 'wishlist',
                isRead      : isRead.checked,
                tags        : JSON.stringify([]),
                authors     : book.volumeInfo.authors?.join(', ') || 'N/A',
                isFavourite : false
            }

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(payload)
            }

            const res = await fetch(`${API_URL}/book`, requestOptions)
            const json = await res.json()
            console.log(json)

            updateUser()

            return json
        } catch (e) {
            console.log(e)
            setTimeout( () => { setIsBookAdded(false) }, 2000 )
        }
    }



    return {
        showAddBookModal,
        setShowAddBookModal,
        isBookAdded,
        setIsBookAdded,
        query,
    }   
}

