import { API_URL } from "../../../config"
import { useQuery } from "@tanstack/react-query"
import { Req } from "../../../lib/Req/Req"
import { CommunityPost } from "../../../types/types"


/**
 * 
 * The api query or mutation to be consumed across the app
 * 
 */
export function useCommunityPosts() {

    return useQuery({
        queryKey : ['getCommunityPosts'],
        queryFn  : getCommunityPosts
    })
}


/**
 * 
 * The function containing the request and response.
 * Only to be used in the above hook
 * @returns a validated response or throws an error
 * 
 */
async function getCommunityPosts() : Promise<CommunityPost[]> {

    const response = await Req.get(`${API_URL}/community`)

    if( response.error || !Array.isArray( response.data ) ) {
        throw new Error('Error getting community posts from API')
    }

    return response.data
}