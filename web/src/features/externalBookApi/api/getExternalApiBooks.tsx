import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GOOGLE_BOOKS_API_URL } from "../../../config"
import { Req } from "../../../lib/Req/Req"
import { getFormData } from "../../../utils/getFormData"
import { CreateUserModelBook, ExternalApiBookResponse } from "../../../types/types"
import { CreateUserModelBookSchema } from "../../bookshelf/validation/userModelBookValidation"
import { useStore } from "../../../store/store"


/**
 * 
 * The api query or mutation to be consumed across the app
 * 
 */
export default function useExternalApiBooks() {

    const { auth : { user }} = useStore()
    const client = useQueryClient()

    return useMutation({
        mutationKey : ['searchGoogleBooks'],
        mutationFn  : () => searchGoogleBooks(user?.id),
        onSuccess   : () => {
            client.invalidateQueries({
                queryKey : ['getUserBooks']
            })
        },
        onError : (e) => console.log({e})
    })
}


/**
 * 
 * The function containing the request and response.
 * Only to be used in the above hook
 * @returns a validated response or throws an error
 * 
 */
async function searchGoogleBooks(userId : number|undefined) : Promise<CreateUserModelBook[]> {

    if( !userId) {
        throw new Error('Invalid user id')
    }

    const searchQuery = getFormData('#search-external-book-api-form').query
    if(!searchQuery) {
        throw new Error('Invalid search query')
    }

    const result = await Req.get( `${GOOGLE_BOOKS_API_URL}?q=${searchQuery}&maxResults=40&orderBy=relevance&printType=books`)

    if( result.error ) {
        throw new Error('Error searching Google Books')
    }

    if( result.data.totalItems === 0 ) {
        return []
    }

    const books = result.data as ExternalApiBookResponse

    const transform = books.items?.map( book => CreateUserModelBookSchema.cast({
        title       : book.volumeInfo?.title || '',
        authors     : book.volumeInfo?.authors?.join(', ') || 'N/A',
        userId      : userId,
        rating      : 0,
        isRead      : false,
        isFavourite : false,
        group       : 'wishlist',
        tags        : '',
        imageUrl    : book.volumeInfo?.imageLinks?.thumbnail || book.volumeInfo?.imageLinks?.thumbnail || null,
        isbn10      : book.volumeInfo?.industryIdentifiers?.filter( id => id.type === 'ISBN_10')[0]?.identifier || null,
        isbn13      : book.volumeInfo?.industryIdentifiers?.filter( id => id.type === 'ISBN_13')[0]?.identifier || null,
    })) || []

    return transform
}
