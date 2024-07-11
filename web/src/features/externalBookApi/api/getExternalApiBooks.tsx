import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GOOGLE_BOOKS_API_URL } from "../../../config"
import { Req } from "../../../lib/Req/Req"
import { getFormData } from "../../../utils/getFormData"
import { ExternalApiBookResponse } from "../../../types/types"


/**
 * 
 * The api query or mutation to be consumed across the app
 * 
 */
export default function useExternalApiBooks() {

    const client = useQueryClient()

    return useMutation({
        mutationKey : ['searchGoogleBooks'],
        mutationFn  : searchGoogleBooks,
        onSuccess   : () => {
            client.invalidateQueries({
                queryKey : ['getUserBooks']
            })
        }
    })
}


/**
 * 
 * The function containing the request and response.
 * Only to be used in the above hook
 * @returns a validated response or throws an error
 * 
 */
async function searchGoogleBooks() {

    const searchQuery = getFormData('#search-external-book-api-form').query
    if(!searchQuery) return null

    const result = await Req.get( `${GOOGLE_BOOKS_API_URL}?q=${searchQuery}&maxResults=40&orderBy=relevance&printType=books`)

    if( result.error ) {
        throw new Error('Error searching Google Books')
    }

    return result.data as ExternalApiBookResponse
}