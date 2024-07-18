import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GOOGLE_BOOKS_API_URL } from "../../../config"
import { Req } from "../../../lib/Req/Req"
import { getFormData } from "../../../utils/getFormData"
import { CreateBook, ExternalApiBookResponse } from "../../../types/types"
import { useStore } from "../../../store/store"
import { CreateBookSchema } from "../../bookshelf/validation/createBookValidation"


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

    const searchQuery = getFormData('#search-external-book-api-form').query
    if(!searchQuery) {
        return []
    }

    const result = await Req.get( `${GOOGLE_BOOKS_API_URL}?q=${searchQuery}&maxResults=40&orderBy=relevance&printType=books`)

    if( result.error ) {
        throw new Error('Error searching Google Books')
    }

    if( result.data.totalItems === 0 ) {
        return []
    }

    const results       = result.data as ExternalApiBookResponse
    const booksWithIsbn = results.items?.filter( book => {

        const ids = book?.volumeInfo?.industryIdentifiers

        if( ids?.some( id => id.type === 'ISBN_10' ) || ids?.some( id => id.type === 'ISBN_13' )) {
            return book
        }
    }) || []

    const transform = booksWithIsbn?.map( book => CreateBookSchema.cast({
        title         : book.volumeInfo?.title || '',
        authors       : book.volumeInfo?.authors?.join(', ') || 'N/A',
        userId        : userId,
        rating        : 0,
        isRead        : false,
        isFavourite   : false,
        group         : 'wishlist',
        imageUrl      : book.volumeInfo?.imageLinks?.thumbnail || book.volumeInfo?.imageLinks?.thumbnail || null,
        isbn10        : book.volumeInfo?.industryIdentifiers?.filter( id => id.type === 'ISBN_10')[0]?.identifier || '',
        isbn13        : book.volumeInfo?.industryIdentifiers?.filter( id => id.type === 'ISBN_13')[0]?.identifier || '',
        description   : book.volumeInfo?.description || null,
        pageCount     : book.volumeInfo?.pageCount || null,
        subTitle      : book.volumeInfo?.subtitle || null,
        publishedDate : book.volumeInfo?.publishedDate || null,
        tags          : formatTags( book.volumeInfo?.categories )
    })) || []

    return transform
}


function formatTags( categories : string[] | undefined) {
    if( !categories || !Array.isArray(categories) ) return JSON.stringify([])

    const tags = categories.map( 
        cat => cat.replaceAll(' ', '').toLowerCase().split('&') 
    ).flat()

    return JSON.stringify(tags)
}