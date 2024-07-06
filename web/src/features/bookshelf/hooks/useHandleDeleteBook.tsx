import { SyntheticEvent, useState } from "react"
import { useStore } from "../../../store/store"
import { UserBook } from "../../../types/types"
import { useUserBooks } from "../api/getUserBooks"
import { useDeleteUserBook } from "../api/deleteUserBook"


export default function useHandleDeleteBook({
    book
} : {
    book : UserBook
}) {
    
    const { auth : {token} } = useStore()
    const userBooks = useUserBooks()

    const [hasClicked, setHasClicked] = useState<boolean>(false)
    const query = useDeleteUserBook({book, token})

    async function handleDeleteBook(e: SyntheticEvent) {
        e.preventDefault()

        query.refetch()
        userBooks.mutate()
        setHasClicked(true)
    }
    
    return {
        query,
        handleDeleteBook,
        hasClicked
    }
}