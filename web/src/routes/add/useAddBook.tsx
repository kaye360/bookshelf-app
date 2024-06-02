import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { GoogleBookResponse } from "../../lib/book/types"
import { SearchInput, UseAddBook } from "./types"



export default function useAddBook() : UseAddBook {
    
    const [query, setQuery] = useState<string | null>(null)

    const { data, isError, isFetching, isSuccess } = useQuery({
        queryKey : ['searchGoogleBooks', query],
        queryFn  : () => searchGoogleBooks(query),
        initialData : null
    })

    async function searchGoogleBooks(query: string | null) {
        if(!query) return null
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
        const json = await res.json()
        return json as GoogleBookResponse
    }

    const { register, handleSubmit } = useForm<SearchInput>()

    const onSubmit: SubmitHandler<SearchInput> = async (data) => {
        setQuery(data.query)
    }

    const hasNoResults = data?.totalItems === 0
    const hasResults   = isSuccess && !isFetching && data !== null && data.totalItems !== 0
    
    return {
        handleSubmit,
        onSubmit,
        register,
        setQuery,
        isFetching,
        isError,
        hasNoResults,
        hasResults,
        query,
        data
    }
}
