import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../../config";
import { Req } from "../../../lib/Req/Req";
import { useStore } from "../../../store/store";
import { AuthSuccess } from "../../../types/types";
import { AuthSchema } from "../validation/authValidation";
import { useCreateCommunityPost } from "../../community/api/createCommunityPost";


/**
 * 
 * The api query or mutation to be consumed across the app
 * 
 */
export function useGuest() {

    const { 
        authActions : { updateAuth }, 
        booksActions : { updateBooks },
    } = useStore()
    const community = useCreateCommunityPost()
    const client = useQueryClient()

    return useMutation({
        mutationKey : ['guest'],
        mutationFn  : async () => {
            updateAuth('LOADING')
            const data = await guest()
            return data
        },
        onSuccess : (data) => {
            updateAuth('LOGIN', data.user, data.token)
            updateBooks([])
            client.invalidateQueries({
                queryKey : ['getBooks', 'getSettings'],
            })
            community.mutate({type : 'JOIN'})
        },
        onError : (e) => {
            updateAuth('LOGIN_ERROR')
            console.log({e})
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
async function guest() : Promise<Pick<AuthSuccess, 'token' | 'user'>> {

    const response = await Req.post({ 
        url : `${API_URL}/auth/guest`, 
    })

    console.log(response)

    if( response.error || !response.data?.user?.id || !response.data?.access_token ) {
        throw new Error('Login Error')
    }

    const validated = AuthSchema.validateSync({
        user : response.data.user,
        token : response.data.access_token
    })

    localStorage.setItem('auth', JSON.stringify({...validated})); 
    return validated
}