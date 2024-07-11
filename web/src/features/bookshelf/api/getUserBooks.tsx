import { useStore } from "../../../store/store"
import { API_URL } from "../../../config"
import { isNumber } from "../../../utils/validation"
import { useQuery } from "@tanstack/react-query"
import { Req } from "../../../lib/Req/Req"
import { UserBook, UserModelBook } from "../../../types/types"
import { UserBookSchema } from "../validation/userBookValidation"


/**
 * 
 * The api query or mutation to be consumed across the app
 * 
 */
export function useUserBooks() {

    const { 
        booksActions : { updateBookStatus, updateBooks }, 
        auth : { user } 
    } = useStore()

    return useQuery({
        queryKey : ['getUserBooks'],
        queryFn  : async () => {
            const books = await getUserBooks(user?.id)
            updateBooks(books)
            updateBookStatus('SUCCESS')
            return books
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
async function getUserBooks(userId : number | undefined) : Promise<UserBook[]> {

    if( !isNumber(userId) ) {
        throw new Error('Error getting books from API')
    }
    const response = await Req.get(`${API_URL}/bookshelf/${userId}`)

    if( response.error || !Array.isArray( response.data ) ) {
        throw new Error('Error getting books from API')
    }

    const books = response.data as unknown as UserModelBook[]

    const transform = books.map( book => UserBookSchema.cast({
        id          : book.id,
        title       : book.title,
        authors     : book.authors,
        userId      : book.userId,
        rating      : book.rating,
        isRead      : book.isRead,
        isFavourite : book.isFavourite,
        group       : book.group,
        created_at  : book.created_at,
        tags        : JSON.parse( book.tags ) || [],
        image       : {
            url : book.imageUrl || ''
        },
        isbn        : {
            isbn10 : book.isbn10 || '',
            isbn13 : book.isbn13 || ''
        },
    }))

    return transform
}