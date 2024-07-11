import { useState } from "react"
import { ExternalApiBookResponse } from "../../../types/types"


export default function usePaginateResults({
    data
} : {
    data? : ExternalApiBookResponse | null
}) {

    const [page, setPage] = useState<number>(1)
    const nextPage = () => setPage( page + 1)

    const booksWithIsbn = data?.items.filter( book => {
        
        const ids = book?.volumeInfo?.industryIdentifiers

        if( ids?.some( id => id.type === 'ISBN_10' ) || ids?.some( id => id.type === 'ISBN_13' )) {
            return book
        }
    })

    console.log(booksWithIsbn?.map(book => `${book.volumeInfo?.authors?.toString()}`))

    const bookList     = booksWithIsbn ? booksWithIsbn.slice(0, page * 7) : []
    const totalBooks   = booksWithIsbn?.length || 0
    const hasMoreBooks = page * 7 < totalBooks

    return {
        bookList, 
        hasMoreBooks,
        nextPage,
    }
}
