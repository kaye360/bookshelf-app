import { useQuery } from "@tanstack/react-query"
import { GOOGLE_BOOKS_API_URL } from "../../../config"
import { GoogleBookResponse } from "../../../types/types"
import { Req } from "../../../lib/Req/Req"
import { getFormData } from "../../../utils/getFormData"


export default function useGetApiBooks() {

    const { data, isError, isFetching, isSuccess, refetch } = useQuery({
        queryKey : ['searchGoogleBooks'],
        queryFn  : searchGoogleBooks,
        initialData : null,
        enabled : false
    })

    async function searchGoogleBooks() {

        
        const searchQuery = getFormData('#search-external-book-api-form').query
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
        hasResults,
        search : refetch
    }
}