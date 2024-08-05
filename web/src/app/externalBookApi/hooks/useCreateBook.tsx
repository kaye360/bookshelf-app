import { useState, useEffect } from "react"
import useExternalApiBooks from "../api/getExternalApiBooks"
import { UseQueryResult } from "@tanstack/react-query"
import { ExternalApiBook } from "../../../types/types"

export default function useCreateBook({
    key,
    bookQuery
} : {
    key : string | null
    bookQuery : UseQueryResult<ExternalApiBook, Error>
}) {
    const addBookQuery = useExternalApiBooks(key)

    const createBook = Array.isArray( addBookQuery.data )
        ? addBookQuery.data.filter( addBook => addBook.title === bookQuery.data?.title)[0]
        : null

    const [isAddModalOpen, setIsModalOpen] = useState(false)

    async function handleAddBook() {
        addBookQuery.mutate()
        setIsModalOpen(true)
    }

    useEffect( () => {
        addBookQuery.mutate()
    }, [key])

    return {
        createBook,
        isAddModalOpen,
        setIsModalOpen,
        handleAddBook
    }
}
