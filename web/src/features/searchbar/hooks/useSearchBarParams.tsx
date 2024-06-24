import { useSearchParams } from "react-router-dom"
import BookGrid from "../../bookshelf/components/BookGrid"
import BookGridItem from "../../bookshelf/components/BookGridItem"
import BookTable from "../../bookshelf/components/BookTable"
import { resolveBookList } from "../../bookshelf/services/resolveBookList"
import BookCardList from "../../bookshelf/components/BookCardList"
import BookCard from "../../bookshelf/components/BookCard"
import { BookshelfParams } from "../../bookshelf/types/types"
import { useAuth } from "../../auth/hooks/useAuth"
import { BookTableComponent } from "../../bookshelf/components/BookTableComponents"


export default function useSearchBarParams() {

    const { user } = useAuth()

    const [searchParams, setSearchParams] = useSearchParams({
        viewAs        : user?.settings?.view || 'grid',
        sortBy        : user?.settings?.sort || 'title',
        filterBy      : user?.settings?.filter || "all",
        searchQuery : "",
    })

    function updateSearchParam<K extends keyof BookshelfParams>(param : K, value: BookshelfParams[K]) {
        if( typeof param !== 'string') return
        setSearchParams(prev => {
            prev.set(param, value)
            return prev
        }, {replace : true} )
    } 

    const allUsersBooks = user?.books ? user?.books : []
    const books         = resolveBookList(allUsersBooks, searchParams)

    let BookList = BookGrid
    if( searchParams.get('viewAs') === 'list' ) BookList = BookTable
    if( searchParams.get('viewAs') === 'card' ) BookList = BookCardList

    let BookListItem = BookGridItem
    if( searchParams.get('viewAs') === 'list' ) BookListItem = BookTableComponent.Row
    if( searchParams.get('viewAs') === 'card' ) BookListItem = BookCard
    
    return {
        searchParams,
        setSearchParams,
        updateSearchParam,
        books,
        BookList,
        BookListItem
    }
}
