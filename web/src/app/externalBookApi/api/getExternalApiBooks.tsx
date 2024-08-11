import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateBook, ExternalApiBookResponse } from "../../../types/types"
import { useStore } from "../../../store/store"
import { CreateBookSchema } from "../../bookshelf/validation/createBookValidation"
import { formatExternalApiTags } from "../services/fomatExternalApiTags"


/**
 * This API URL should not be used anywhere else in this app
 */
const  EXTERNAL_BOOK_API_URL = 'https://openlibrary.org/search.json?q='
const EXTERNAL_BOOK_PARAMS   = '&lang=en&sort=rating desc'


/**
 * 
 * The api query or mutation to be consumed across the app
 * 
 */
export default function useExternalApiBooks(searchQueryParam : string | null) {

    const client = useQueryClient()

    return useMutation({
        mutationKey : ['searchExternalApiBooks', searchQueryParam],
        mutationFn  : () => searchExternalApiBooks(searchQueryParam),
        onSuccess   : () => {
            client.invalidateQueries({
                queryKey : ['getBooks']
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
async function searchExternalApiBooks(searchQueryParam : string | null) : Promise<CreateBook[]> {


    if( !searchQueryParam ) {
        return []
    }

    const userId = useStore.getState().auth?.user?.id

    if( !userId ) {
        throw new Error('Invalid user id')
    }

    const response = await fetch( EXTERNAL_BOOK_API_URL + searchQueryParam + EXTERNAL_BOOK_PARAMS )
    const results = await response.json() as ExternalApiBookResponse

    const transform = results.docs?.map( book => CreateBookSchema.cast({
        key           : book.key.replace('/works/', ''),
        title         : book.title,
        authors       : book.author_name ? book.author_name.join(', ') : 'N/A',
        userId        : userId,
        isRead        : false,
        isFavourite   : false,
        group         : 'wishlist',
        imageUrl      : book.cover_edition_key ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}.jpg` : null,
        pageCount     : book.number_of_pages_median || 0,
        publishedDate : book.first_publish_year || '',
        tags          : book.subject 
            ? JSON.stringify( formatExternalApiTags(book.subject) )
            : JSON.stringify( [] ),
    })) || []
    
    return transform
}