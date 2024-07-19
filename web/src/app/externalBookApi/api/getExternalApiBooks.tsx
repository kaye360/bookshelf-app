import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getFormData } from "../../../utils/getFormData"
import { CreateBook, ExternalApiBookResponse } from "../../../types/types"
import { useStore } from "../../../store/store"
import { CreateBookSchema } from "../../bookshelf/validation/createBookValidation"


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
export default function useExternalApiBooks() {

    const { auth : { user }} = useStore()
    const client = useQueryClient()

    return useMutation({
        mutationKey : ['searchGoogleBooks'],
        mutationFn  : () => searchGoogleBooks(user?.id),
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
async function searchGoogleBooks(userId : number|undefined) : Promise<CreateBook[]> {

    if( !userId) {
        throw new Error('Invalid user id')
    }

    const searchQuery = getFormData('#search-external-book-api-form').query.toString().replaceAll(' ', '+')
    console.log(searchQuery)
    if(!searchQuery) {
        return []
    }

    const response = await fetch( EXTERNAL_BOOK_API_URL + searchQuery + EXTERNAL_BOOK_PARAMS )
    const results = await response.json() as ExternalApiBookResponse

    console.log(results)

    const transform = results.docs?.map( book => CreateBookSchema.cast({
        key           : book.key.replace('/works/', ''),
        title         : book.title,
        authors       : book.author_name ? book.author_name.join(', ') : 'N/A',
        userId        : userId,
        rating        : 0,
        isRead        : false,
        isFavourite   : false,
        group         : 'wishlist',
        imageUrl      : book.cover_edition_key ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}.jpg` : null,
        pageCount     : book.number_of_pages_median || 0,
        publishedDate : book.first_publish_year || '',
        tags          : book.subject 
            ? JSON.stringify( book.subject.sort( (a,b) => a.length > b.length ? 1 : -1).slice(0,3) )
            : JSON.stringify( [] ),
    })) || []
    
    console.log(transform)

    return transform
}