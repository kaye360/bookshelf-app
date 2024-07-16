import BookCard from "../components/BookCard"
import BookCardList from "../components/BookCardList"
import BookGrid from "../components/BookGrid"
import BookGridItem from "../components/BookGridItem"
import BookTable from "../components/BookTable"
import { BookTableComponent } from "../components/BookTableComponents"


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