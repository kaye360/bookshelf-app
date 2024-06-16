    import { useQuery } from "@tanstack/react-query"
import { GoogleBookResponse } from "../../book/types/types"
import { GOOGLE_BOOKS_API_URL } from "../../../config"
import useFetch from "../../../hooks/useFetch"


interface UseSearchExternalBookApiProps {
    searchQuery : string | null
}


export default function useSearchExternalBookApi( {searchQuery} : UseSearchExternalBookApiProps ) {

    const { fetchApi } = useFetch()

    const { data, isError, isFetching, isSuccess } = useQuery({
        queryKey : ['searchGoogleBooks', searchQuery],
        queryFn  : () => searchGoogleBooks(searchQuery),
        initialData : null
    })

    async function searchGoogleBooks(searchQuery: string | null) {

        if(!searchQuery) return null

        const result = await fetchApi({
            url : `${GOOGLE_BOOKS_API_URL}?q=${searchQuery}&maxResults=40&orderBy=relevance&printType=books`
        })

        return result.data as GoogleBookResponse
    }

    const hasResults   = isSuccess && !isFetching && data !== null && data.totalItems !== 0
    
    return {
        data,
        isError,
        isFetching,
        isSuccess,
        hasResults
    }
}
