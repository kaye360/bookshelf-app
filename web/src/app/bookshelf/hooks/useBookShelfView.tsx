import BookCard from "../components/views/BookCard"
import BookCardList from "../components/views/BookCardList"
import BookGrid from "../components/views/BookGrid"
import BookGridItem from "../components/views/BookGridItem"
import BookTable from "../components/views/BookTable"
import { BookTableComponent } from "../components/views/BookTableComponents"

export default function useBookShelfView(searchParams : URLSearchParams) {

    const viewAs = searchParams.get('viewAs')

    let BookList = BookGrid
    if( viewAs === 'list' ) BookList = BookTable
    if( viewAs === 'card' ) BookList = BookCardList

    let BookListItem = BookGridItem
    if( viewAs === 'list' ) BookListItem = BookTableComponent.Row
    if( viewAs === 'card' ) BookListItem = BookCard

    return {
        BookList,
        BookListItem
    }
}