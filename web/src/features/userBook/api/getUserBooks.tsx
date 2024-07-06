import { useStore } from "../../../store/store"
import { API_URL } from "../../../config"
import { Req, ReqResponse } from "../../../utils/req"
import { isNumber } from "../../../utils/validation"
import { UserBook } from "../../../types/types"
import { validateUserBook } from "../validation/getUserBookValidation"
import { useMutation } from "@tanstack/react-query"



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

    const response = await Req.send({ url : `${API_URL}/bookshelf/${userId}` })
    return response
}
