import { useStore } from "../../../store/store"
import { CreateBook } from "../../../types/types"


export default function useUserHasBook() {

    const { books } = useStore()

    const isbn10List = books.map( book => book.isbn10)
    const isbn13List = books.map( book => book.isbn13)

    function userHasBook(book : CreateBook) : boolean {
        if( !book.isbn10 || !book.isbn13 ) return false
        return isbn10List.includes( book.isbn10 ) && isbn13List.includes( book.isbn13 )
    }

    return userHasBook
}
