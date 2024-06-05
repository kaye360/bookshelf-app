import { useSearchParams } from "react-router-dom"
import BookGrid from "../../features/bookshelf/components/BookGrid"
import BookGridItem from "../../features/bookshelf/components/BookGridItem"
import BookTable from "../../features/bookshelf/components/BookTable"
import { useAuth } from "../../features/auth/components/AuthProvider"
import { resolveBookList } from "../../features/bookshelf/services/resolveBookList"
import { bookshelfOptionsInitialState } from "../../features/bookshelf/services/initialState"
import BookCardList from "../../features/bookshelf/components/BookCardList"
import BookCard from "../../features/bookshelf/components/BookCard"
import BookTableRow from "../../features/bookshelf/components/BookTableRow"
import { BookshelfParams } from "../../features/bookshelf/types/types"


export default function useBooks() {

    const { user } = useAuth()

    const [searchParams, setSearchParams] = useSearchParams(bookshelfOptionsInitialState)

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
    if( searchParams.get('viewAs') === 'list' ) BookListItem = BookTableRow
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
