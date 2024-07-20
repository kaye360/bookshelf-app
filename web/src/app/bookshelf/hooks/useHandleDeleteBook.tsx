import { SyntheticEvent, useState } from "react"
import { Book } from "../../../types/types"
import { useDeleteBook } from "../api/deleteBook"


export default function useHandleDeleteBook({
    book
} : {
    book : Book
}) {
    
    const [hasClicked, setHasClicked] = useState<boolean>(false)
    const query = useDeleteBook()

    async function handleDeleteBook(e: SyntheticEvent) {
        e.preventDefault()
        query.mutate({book})
        setHasClicked(true)
    }
    
    return {
        query,
        handleDeleteBook,
        hasClicked
    }
}