import { useSearchParams } from "react-router-dom"
import { useStore } from "../../../store/store"
import { BookshelfParams } from "../../../types/types"
import { BookListResolver } from "../services/BookListResolver"


export default function useSearchBarParams() {

    let { settings, books } = useStore()

    const [searchParams, setSearchParams] = useSearchParams({
        viewAs        : settings?.view || 'grid',
        sortBy        : settings?.sort || 'title',
        filterBy      : settings?.filter || "all",
        searchQuery : "",
    })

    function updateSearchParam<K extends keyof BookshelfParams>(param : K, value: BookshelfParams[K]) {
        if( typeof param !== 'string') return
        setSearchParams(prev => {
            prev.set(param, value)
            return prev
        }, {replace : true} )
    } 

    const bookListResolver = new BookListResolver({books, searchParams})
    const resolvedbooks = bookListResolver.resolve()
    
    return {
        searchParams,
        setSearchParams,
        updateSearchParam,
        resolvedbooks,
    }
}
