import { API_URL } from "../../../config";
import { CommunityPost } from "../../../types/types";
import { Req } from "../../../lib/Req/Req";
import { useMutation, useQueryClient } from "@tanstack/react-query";


interface CreateCommunityPostProps extends Omit<CommunityPost, 'id' | 'created_at'> {
    token : string
}

 
/**
 * 
 * The api query or mutation to be consumed across the app
 * 
 */
export function useCreateCommunityPost() {

    const client = useQueryClient()

    return useMutation({
        mutationKey : ['createCommunityPost'],
        mutationFn  : (props : CreateCommunityPostProps) => createCommunityPost({...props}),
        onSuccess   : () => {
            client.invalidateQueries({
                queryKey : ['getCommunityPosts']
            })
        },
        onError : (error) => console.log({error})
    })
}


/**
 * 
 * The function containing the request and response.
 * Only to be used in the above hook
 * @returns a validated response or throws an error
 * 
 */
async function createCommunityPost(props : CreateCommunityPostProps ) : Promise<CommunityPost> {

    const { token } = props
    if( !token ) {
        throw new Error('Invalid user or token')
    }

    const response = await Req.post({
        url     : `${API_URL}/community`,
        payload : {...props},
        token
    })

    return response.data
}