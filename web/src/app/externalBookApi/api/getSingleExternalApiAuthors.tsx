import { useQuery } from "@tanstack/react-query"
import { ExternalApiAuthor, ExternalApiBook } from "../../../types/types"


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
export default function useSingleExternalApiAuthors(authors: ExternalApiBook['authors']) {

    return useQuery({
        queryKey : ['getSingleExternalApiAuthors', authors],
        queryFn  : () => getSingleExternalApiAuthors(authors),
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
async function getSingleExternalApiAuthors(authors: ExternalApiBook['authors']) : Promise<ExternalApiAuthor[]> {

    if( !Array.isArray(authors) ) {
        throw new Error('Invalid external api authors array')
    }

    async function authorFetch(url : string) {
        const data = await fetch(url)
        const json = await data.json()
        return json as ExternalApiAuthor
    }

    const apiAuthorsPromise = await Promise.allSettled(authors.slice(0,3).map( author => (
        authorFetch( EXTERNAL_BOOK_API_URL + author.author?.key + '.json' )
    )))

    const apiAuthors = apiAuthorsPromise
        .filter( promise => promise.status === 'fulfilled' )
        // @ts-ignore
        .map( promise => promise.value ) 

    return apiAuthors
}