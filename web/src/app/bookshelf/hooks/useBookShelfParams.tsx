import { useSearchParams } from "react-router-dom"
import { useStore } from "../../../store/store"
import { BookshelfParams } from "../../../types/types"
import { BookListResolver } from "../services/BookListResolver"
import { useEffect } from "react"

export default function useBookshelfParams() {

    let { settings, books } = useStore()

    const [searchParams, setSearchParams] = useSearchParams({
        viewAs        : settings?.view || 'grid',
        sortBy        : settings?.sort || 'title',
        filterBy      : settings?.filter || "all",
        searchQuery : "",
    })

    useEffect( () => {
        if( searchParams.get('viewAs') === null ) {
            updateSearchParam('viewAs', settings?.view || 'grid')
        }
        if( searchParams.get('sortBy') === null ) {
            updateSearchParam('sortBy', settings?.sort || 'title')
        }
        if( searchParams.get('filterBy') === null ) {
            updateSearchParam('filterBy', settings?.filter || 'all')
        }
    }, [searchParams])

    function updateSearchParam<K extends keyof BookshelfParams>(param : K, value: BookshelfParams[K]) {
        if( typeof param !== 'string') return
        setSearchParams(prev => {
            prev.set(param, value)
            return prev
        }, {replace : true} )
    } 

    const bookListResolver = new BookListResolver({
        books, 
        searchQuery : searchParams.get('searchQuery'),
        filterBy    : searchParams.get('filterBy'),
        sortBy      : searchParams.get('sortBy'),
    })
    const resolvedBooks = bookListResolver.resolve()
    
    return {
        searchParams,
        setSearchParams,
        updateSearchParam,
        resolvedBooks,
    }
}
