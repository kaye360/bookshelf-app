import { API_URL } from "../../../config"
import { useQuery } from "@tanstack/react-query"
import { Req } from "../../../lib/Req/Req"
import { Profile } from "../../../types/types"


/**
 * 
 * The api query or mutation to be consumed across the app
 * 
 */
export function useProfile(userHandle : string|undefined) {

    return useQuery({
        queryKey : ['getProfile', userHandle],
        queryFn  : async () => {
            const profile = await getProfile(userHandle)
            return profile
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
async function getProfile( userHandle : string|undefined ) : Promise<Profile> {
    if( !(userHandle) ) {
        throw new Error('Error Profile from API')
    }
    const response = await Req.get(`${API_URL}/profile/${userHandle}`)
    
    if( response.error ) {
        throw new Error('Error getting books from API')
    }

    return response.data as unknown as Profile
}