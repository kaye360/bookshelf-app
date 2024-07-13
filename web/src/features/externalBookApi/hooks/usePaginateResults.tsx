import { useState } from "react"
import { CreateUserModelBook } from "../../../types/types"


export default function usePaginateResults({
    data
} : {
    data? : CreateUserModelBook[] | null
}) {

    const [page, setPage] = useState<number>(1)
    const nextPage = () => setPage( page + 1)

    const bookList     = data?.slice(0, page * 7) || []
    const totalBooks   = data?.length || 0
    const hasMoreBooks = page * 7 < totalBooks

    return {
        bookList, 
        hasMoreBooks,
        nextPage,
    }
}
