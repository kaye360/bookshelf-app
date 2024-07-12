import { useState } from "react"
import { CreateUserModelBook } from "../../../types/types"


export default function usePaginateResults({
    data
} : {
    data? : CreateUserModelBook[] | null
}) {

    const [page, setPage] = useState<number>(1)
    const nextPage = () => setPage( page + 1)

    const booksWithIsbn = data?.filter( book => [book.isbn10, book.isbn13].every( id => id !== null) )
 
    const bookList     = booksWithIsbn ? booksWithIsbn.slice(0, page * 7) : []
    const totalBooks   = booksWithIsbn?.length || 0
    const hasMoreBooks = page * 7 < totalBooks

    return {
        bookList, 
        hasMoreBooks,
        nextPage,
    }
}
