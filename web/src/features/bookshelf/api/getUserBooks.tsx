import { useStore } from "../../../store/store"
import { API_URL } from "../../../config"
import { isNumber } from "../../../utils/validation"
import { validateUserBook } from "../validation/getUserBookValidation"
import { useQuery } from "@tanstack/react-query"
import { Req } from "../../../lib/Req/Req"
import { ReqResponse } from "../../../lib/Req/Req.type"


export function useUserBooks() {

    const { 
        booksActions : { updateBookStatus, updateBooks }, 
        auth : { user } 
    } = useStore()

    const query = useQuery({
        queryKey : ['getUserBooks'],
        queryFn  : async () => {
            const books = await getUserBooksFromApi(user?.id)
            updateBooks(books.data)
            updateBookStatus('SUCCESS')
            return books
        }
    })

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

    if( response.error ) {
        return response
    }

    response.data = validateUserBook(response.data)

    return response
}
