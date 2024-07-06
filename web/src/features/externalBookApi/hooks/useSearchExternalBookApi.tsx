    import { useQuery } from "@tanstack/react-query"
import { GOOGLE_BOOKS_API_URL } from "../../../config"
import { GoogleBookResponse } from "../../../types/types"
import { Req } from "../../../lib/Req/Req"


export default function useSearchExternalBookApi({
    searchQuery
} : {
    searchQuery : string | null
}) {

    const { data, isError, isFetching, isSuccess } = useQuery({
        queryKey : ['searchGoogleBooks', searchQuery],
        queryFn  : () => searchGoogleBooks(searchQuery),
        initialData : null
    })

    async function searchGoogleBooks(searchQuery: string | null) {

        if(!searchQuery) return null

        const result = await Req.get( `${GOOGLE_BOOKS_API_URL}?q=${searchQuery}&maxResults=40&orderBy=relevance&printType=books`)

        return result.data as GoogleBookResponse
    }

    const hasResults = isSuccess && !isFetching && data !== null && data.totalItems !== 0
    
    return {
        data,
        isError,
        isFetching,
        isSuccess,
        hasResults
    }
}
