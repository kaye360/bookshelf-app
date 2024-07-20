import { useQuery } from "@tanstack/react-query"
import { ExternalApiBook } from "../../../types/types"


/**
 * This API URL should not be used anywhere else in this app
 * Dont forget to append .json to the end
 */
const  EXTERNAL_BOOK_API_URL = 'https://openlibrary.org'


/**
 * 
 * The api query or mutation to be consumed across the app
 * 
 */
export default function useSingleExternalApiBook(id: string | undefined) {

    return useQuery({
        queryKey : ['getSingleExternalApiBook'],
        queryFn  : () => getSingleExternalApiBook(id),
        refetchOnMount : 'always'
    })
}


/**
 * 
 * The function containing the request and response.
 * Only to be used in the above hook
 * @returns a validated response or throws an error
 * 
 */
async function getSingleExternalApiBook(id: string | undefined) : Promise<ExternalApiBook> {

    if( !id ) {
        throw new Error('No book id given')
    }

    const response = await fetch( EXTERNAL_BOOK_API_URL + '/works/' + id + '.json' )
    const results = await response.json() as ExternalApiBook
    
    return results
}