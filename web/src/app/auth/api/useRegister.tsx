import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../../config";
import { Req } from "../../../lib/Req/Req";
import { useStore } from "../../../store/store";
import { AuthSuccess, RegisterPayload } from "../../../types/types";
import { AuthSchema } from "../validation/authValidation";
import { useCreateCommunityPost } from "../../community/api/createCommunityPost";

interface RegisterProps extends RegisterPayload {}

export default function useRegister() {

    const { authActions : { updateAuth } } = useStore()
    const client = useQueryClient()
    const community = useCreateCommunityPost()

    return useMutation({
        mutationKey : ['register'],
        mutationFn : async(props : RegisterProps) => {
            updateAuth('LOADING')
            const data = await register({...props})
            return data
        },
        onSuccess : (data) => {
            updateAuth('LOGIN', data.user, data.token)
            client.invalidateQueries({
                queryKey : ['getBooks']
            })
            community.mutate({type : 'JOIN'})
        },
        onError : () => updateAuth('REGISTER_ERROR') 
    })
}


async function register(payload : RegisterProps) : Promise<Pick<AuthSuccess, 'token' | 'user'>> { 

    const response = await Req.post({ 
        url : `${API_URL}/auth/register`, 
        payload 
    })
    
    if( response.error) {
        throw new Error('Register Error')
    }

    const validated = AuthSchema.validateSync({
        user : response.data.user,
        token : response.data.access_token
    })

    localStorage.setItem('auth', JSON.stringify({...validated})); 

    return validated
}