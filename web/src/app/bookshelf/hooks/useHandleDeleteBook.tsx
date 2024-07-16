import { SyntheticEvent, useState } from "react"
import { useStore } from "../../../store/store"
import { Book } from "../../../types/types"
import { useDeleteBook } from "../api/deleteBook"


export default function useHandleDeleteBook({
    book
} : {
    book : Book
}) {
    
    const { auth : {token} } = useStore()
    const [hasClicked, setHasClicked] = useState<boolean>(false)
    const query = useDeleteBook()

    async function handleDeleteBook(e: SyntheticEvent) {
        e.preventDefault()
        query.mutate({book, token})
        setHasClicked(true)
    }
    
    return {
        query,
        handleDeleteBook,
        hasClicked
    }
}