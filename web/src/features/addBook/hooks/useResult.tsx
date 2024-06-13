import { useState } from "react";
import { GoogleBook } from "../../book/types/types";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../../config";
import { useAuth } from "../../auth/components/AuthProvider";

export default function useResult({book} : {book: GoogleBook}) {

    const [showAddBookModal, setShowAddBookModal] = useState(false)
    const [isClicked, setIsClicked] = useState(false)

    const { user, updateUser } = useAuth()

    const query = useQuery({
        queryKey : ['addGoogleBook', book.id, isClicked],
        queryFn : addGoogleBook
    })

    async function addGoogleBook() {
        if( !isClicked ) return null

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

            updateUser()

            return json
        } catch (e) {
            console.log(e)
        }
    }

    function formatGoogleBookResult(book: GoogleBook) {
        const thumbnail   = book.volumeInfo.imageLinks?.thumbnail || book.volumeInfo.imageLinks?.smallThumbnail || null
        const title       = book.volumeInfo.title || null
        const subTitle    = book.volumeInfo.subtitle || null
        const pageCount   = book.volumeInfo.pageCount || null
        const identifiers = book.volumeInfo.industryIdentifiers || null
        const categories  = book.volumeInfo.categories || null
        const authors     = book.volumeInfo.authors?.slice(0,5).join(', ') || null
        const description = typeof book.volumeInfo.description === 'string' && 
                            book.volumeInfo.description.length > 200
                                ? book.volumeInfo.description.slice(0,200) + '...'
                                : book.volumeInfo.description

        return { thumbnail, title, subTitle, pageCount, identifiers, categories, authors, description }
    }

    return {
        showAddBookModal,
        setShowAddBookModal,
        isClicked,
        setIsClicked,
        formatGoogleBookResult,
        query,
    }   
}

