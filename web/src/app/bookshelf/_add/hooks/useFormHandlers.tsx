import { SyntheticEvent, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import useExternalApiBooks from "../../../externalBookApi/api/getExternalApiBooks"
import usePaginateResults from "../../../externalBookApi/hooks/usePaginateResults"


export default function useFormHandlers() {

    /**
     * Search Params
     */
    const [searchParams, setSearchParams] = useSearchParams()
    const searchQueryParam = searchParams.get('q')

    /**
     * Query
     */
    const query = useExternalApiBooks(searchQueryParam)
    useEffect( () => {  
        query.mutate()
    }, [searchQueryParam])

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
        setSearchParams({
            q: ''
        })
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
        searchQueryParam
    }
}
