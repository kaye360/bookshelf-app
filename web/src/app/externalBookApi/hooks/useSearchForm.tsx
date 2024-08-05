import { SyntheticEvent, useState } from "react"
import usePaginateResults from "./usePaginateResults"
import { UseMutationResult } from "@tanstack/react-query"
import { CreateBook } from "../../../types/types"
import { SetURLSearchParams } from "react-router-dom"

export default function useSearchForm({
    query, 
    setSearchParams
} : {
    query           : UseMutationResult<CreateBook[], Error, void, unknown>,
    setSearchParams : SetURLSearchParams
}) {

    /**
     * Form state
     */
    const [hasSearched, setHasSearched] = useState<boolean>(false)

    const hasResults = query.isSuccess && !query.isPending && query.data.length !== 0

    const { bookList, hasMoreBooks, nextPage } = usePaginateResults({ data : query.data })

    /**
     * Form click handlers
     */
    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        if( !(e.target instanceof HTMLFormElement) ) return

        const formData = new FormData(e.target)
        const formObj = Object.fromEntries( formData )

        // @ts-ignore
        setSearchParams(formObj)
        setHasSearched(true)

        const searchQueryEl = document.querySelector('#search-query-input') as HTMLInputElement
        searchQueryEl && searchQueryEl.blur()
    }

    function handleReset() {
        setHasSearched(false)
        setSearchParams({ q: '' })
    }

    return {
        handleReset,
        handleSubmit,
        query,
        hasResults,
        hasSearched,
        hasMoreBooks,
        nextPage,
        bookList,
    }
}
