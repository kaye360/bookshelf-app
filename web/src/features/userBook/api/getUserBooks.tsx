import { useStore } from "../../../store/store"
import { API_URL } from "../../../config"
import { isNumber } from "../../../utils/validation"
import { UserBook } from "../../../types/types"
import { validateUserBook } from "../validation/getUserBookValidation"
import { useMutation } from "@tanstack/react-query"
import { ReqResponse } from "../../../lib/Req/Req.type"
import { Req } from "../../../lib/Req/Req"



export function useUserBooks() {

    const { 
        booksActions : { updateBookStatus, updateBooks }, 
        auth : { user } 
    } = useStore()


    const query = useMutation({
        mutationFn : getUserBooks,
        onSuccess : (data) => {
            updateBookStatus('SUCCESS')
            updateBooks(data)
        }
    })

    async function getUserBooks() : Promise<UserBook[]> {

        if( !isNumber(user?.id) ) return []
        const response = await getUserBooksFromApi(user?.id)
        
        if( response.error ) return []
        const validated = validateUserBook(response.data)

        return validated
    }

    return query
}



export async function getUserBooksFromApi(userId : number | undefined) : Promise<ReqResponse> {

    if( !isNumber(userId) ) {
        return {
            data  : null,
            error : 'Invalid User ID',
            code  : 401
        }
    }
    const response = await Req.get(`${API_URL}/bookshelf/${userId}`)
    return response
}
