import { useSearchParams } from "react-router-dom"
import BookGrid from "../../bookshelf/components/BookGrid"
import BookGridItem from "../../bookshelf/components/BookGridItem"
import BookTable from "../../bookshelf/components/BookTable"
import { resolveBookList } from "../services/resolveBookList"
import BookCardList from "../../bookshelf/components/BookCardList"
import BookCard from "../../bookshelf/components/BookCard"
import { BookTableComponent } from "../../bookshelf/components/BookTableComponents"
import { useStore } from "../../../store/store"
import { BookshelfParams } from "../../../types/types"


export default function useSearchBarParams() {

    let { settings, books } = useStore()

    console.log('useSearchParams')

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

    const resolvedbooks = resolveBookList(books, searchParams)
    const viewAs        = searchParams.get('viewAs')

    let BookList = BookGrid
    if( viewAs === 'list' ) BookList = BookTable
    if( viewAs === 'card' ) BookList = BookCardList

    let BookListItem = BookGridItem
    if( viewAs === 'list' ) BookListItem = BookTableComponent.Row
    if( viewAs === 'card' ) BookListItem = BookCard
    
    return {
        searchParams,
        setSearchParams,
        updateSearchParam,
        books : resolvedbooks,
        BookList,
        BookListItem
    }
}
