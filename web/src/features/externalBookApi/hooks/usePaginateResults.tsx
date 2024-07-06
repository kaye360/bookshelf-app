import { useState } from "react"
import { GoogleBookResponse } from "../../../types/types"


export default function usePaginateResults({
    data
} : {
    data : GoogleBookResponse | null
}) {

    const [page, setPage] = useState<number>(1)
    const nextPage = () => setPage( page + 1)

    const booksWithIsbn = data?.items.filter( book => 
        book?.volumeInfo?.industryIdentifiers?.map( id => id.type === 'ISBN_10' || id.type === 'ISBN_13')
    )

    const bookList     = booksWithIsbn ? booksWithIsbn.slice(0, page * 7) : []
    const totalBooks   = booksWithIsbn?.length || 0
    const hasMoreBooks = page * 7 < totalBooks

    return {
        bookList, 
        hasMoreBooks,
        nextPage,
    }
}
