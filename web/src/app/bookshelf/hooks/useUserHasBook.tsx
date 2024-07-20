import { useStore } from "../../../store/store"
import { CreateBook } from "../../../types/types"


export default function useUserHasBook() {

    const { books } = useStore()

    function userHasBook(book : CreateBook) : boolean {

        if( books.some( b => b.key === book.key ) ) {
            return true
        }
        return false
    }

    return userHasBook
}
