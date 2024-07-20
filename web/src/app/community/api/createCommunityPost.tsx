import { API_URL } from "../../../config";
import { Book, CommunityPost, CreateBook, User } from "../../../types/types";
import { Req } from "../../../lib/Req/Req";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useStore } from "../../../store/store";


interface CreateCommunityPostProps {
    user : User
    book : Book | CreateBook
    type : CommunityPost['type']
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

    const token = useStore.getState().auth.token
    if( !token ) {
        throw new Error('Invalid user or token')
    }

    const payload = {
        userId     : props.user.id,
        userHandle : props.user.handle,
        type       : props.type,
        key        : props.book.key,
        title      : props.book.title,
        imageUrl   : props.book.imageUrl
    }

    const response = await Req.post({
        url     : `${API_URL}/community`,
        payload,
        token
    })

    return response.data
}