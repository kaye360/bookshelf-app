import { useStore } from "../../../store/store"
import { API_URL } from "../../../config"
import { isNumber } from "../../../utils/validation"
import { validateUserBook } from "../validation/getUserBookValidation"
import { useQuery } from "@tanstack/react-query"
import { Req } from "../../../lib/Req/Req"
import { UserBook } from "../../../types/types"


export function useUserBooks() {

    const { 
        booksActions : { updateBookStatus, updateBooks }, 
        auth : { user } 
    } = useStore()

    const query = useQuery({
        queryKey : ['getUserBooks'],
        queryFn  : async () => {
            const books = await getUserBooksFromApi(user?.id)
            updateBooks(books)
            updateBookStatus('SUCCESS')
            return books
        }
    })

    return query
}


export async function getUserBooksFromApi(userId : number | undefined) : Promise<UserBook[]> {

    if( !isNumber(userId) ) {
        throw new Error('Error getting books from API')
    }
    const response = await Req.get(`${API_URL}/bookshelf/${userId}`)

    if( response.error ) {
        throw new Error('Error getting books from API')
    }

    const validated = validateUserBook(response.data)
    return validated
}
