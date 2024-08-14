import { SyntheticEvent } from "react"
import { Book } from "../../../types/types"
import { useDeleteBook } from "../api/deleteBook"


export default function useHandleDeleteBook({
    book
} : {
    book : Book
}) {
    
    const query = useDeleteBook()

    async function handleDeleteBook(e: SyntheticEvent) {
        e.preventDefault()
        query.mutate({book})
    }
    
    return {
        query,
        handleDeleteBook,
    }
}