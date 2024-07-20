import { useStore } from "../../../store/store"
import { API_URL } from "../../../config"
import { isNumber } from "../../../utils/validation"
import { useQuery } from "@tanstack/react-query"
import { Req } from "../../../lib/Req/Req"
import { Book } from "../../../types/types"
import { BookSchema } from "../validation/bookValidation"


/**
 * 
 * The api query or mutation to be consumed across the app
 * 
 */
export function useBooks() {

    const { 
        booksActions : { updateBookStatus, updateBooks }, 
        auth : { user } 
    } = useStore()

    return useQuery({
        queryKey : ['getBooks'],
        queryFn  : async () => {
            const books = await getBooks(user?.id)
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
async function getBooks(userId : number | undefined) : Promise<Book[]> {

    if( !isNumber(userId) ) {
        throw new Error('Error getting books from API')
    }
    const response = await Req.get(`${API_URL}/bookshelf/${userId}`)

    if( response.error || !Array.isArray( response.data ) ) {
        throw new Error('Error getting books from API')
    }

    const books = response.data as any[]

    const transform = books.map( (book : any) => BookSchema.cast({
        id            : book.id,
        key           : book.key,
        title         : book.title,
        authors       : book.authors,
        userId        : book.userId,
        rating        : book.rating,
        isRead        : book.isRead,
        isFavourite   : book.isFavourite,
        group         : book.group,
        created_at    : book.created_at,
        tags          : JSON.parse( book.tags ) || [],
        imageUrl      : book.imageUrl,
        isbn10        : book.isbn10 || '',
        isbn13        : book.isbn13 || '',
        publishedDate : book.publishedDate,
        description   : book.description,
        pageCount     : book.pageCount,
        subTitle      : book.subTitle
    }))

    return transform
}