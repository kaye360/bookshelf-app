import { API_URL } from "../../../config"
import { useQuery } from "@tanstack/react-query"
import { Req } from "../../../lib/Req/Req"
import { CommunityPost } from "../../../types/types"
import { bundlePosts } from "../services/bundlePosts"
import { isArray } from "../../../utils/validation"

/**
 * 
 * The api query or mutation to be consumed across the app
 * 
 */
export function useCommunityPosts(page : number = 1) {

    return useQuery({
        queryKey : ['getCommunityPosts', page],
        queryFn  : () => getCommunityPosts(page),
        refetchOnMount : 'always'
    })
}


/**
 * 
 * The api query for infinite scrolling
 * 
 */
export async function infiniteCommunityPosts(page : number) {
    const posts   = await getCommunityPosts(page)
    const bundled = bundlePosts(posts)
    return bundled
}


/**
 * 
 * The function containing the request and response.
 * Only to be used in the above hook
 * @returns a validated response or throws an error
 * 
 */
async function getCommunityPosts( page : number ) : Promise<CommunityPost[]> {

    const response = await Req.get(`${API_URL}/community?page=${page}`)

    if( response.error || !isArray( response.data ) ) {
        throw new Error('Error getting community posts from API')
    }

    return response.data
}