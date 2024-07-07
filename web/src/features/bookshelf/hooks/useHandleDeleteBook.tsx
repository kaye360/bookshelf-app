import { SyntheticEvent, useState } from "react"
import { useStore } from "../../../store/store"
import { UserBook } from "../../../types/types"
import { useDeleteUserBook } from "../api/deleteUserBook"


export default function useHandleDeleteBook({
    book
} : {
    book : UserBook
}) {
    
    const { auth : {token} } = useStore()
    const [hasClicked, setHasClicked] = useState<boolean>(false)
    const query = useDeleteUserBook()

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