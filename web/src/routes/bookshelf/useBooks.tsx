import { useSearchParams } from "react-router-dom"
import BookGrid from "../../components/book/BookGrid"
import BookGridItem from "../../components/book/BookGridItem"
import BookTable from "../../components/book/BookTable"
import BookTableRow from "../../components/book/BookTableRow"
import { useAuth } from "../../lib/auth/AuthProvider"
import { resolveBookList } from "../../lib/book/bookList"
import { BookshelfParams, bookshelfOptionsInitialState } from "../../components/book/bookshelfOptions"
import BookCardList from "../../components/book/BookCardList"
import BookCard from "../../components/book/BookCard"


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
