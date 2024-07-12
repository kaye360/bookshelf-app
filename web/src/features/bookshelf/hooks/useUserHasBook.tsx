import { useStore } from "../../../store/store"
import { CreateUserModelBook } from "../../../types/types"


export default function useUserHasBook(){

    const { books } = useStore()

    const isbn10List = books.map( book => book.isbn.isbn10)
    const isbn13List = books.map( book => book.isbn.isbn13)

    function userHasBook(book : CreateUserModelBook) : boolean {
        return isbn10List.includes( book.isbn10 ) && isbn13List.includes( book.isbn13 )
    }

    return userHasBook
}
