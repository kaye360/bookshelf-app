import { useStore } from "../../../store/store"
import { ExternalApiBook } from "../../../types/types"


export default function useUserHasBook(){

    const { books } = useStore()

    const isbn10List = books.map( book => book.isbn.isbn10)
    const isbn13List = books.map( book => book.isbn.isbn13)

    function userHasBook(book : ExternalApiBook) : boolean {
    
        const ids = book?.volumeInfo?.industryIdentifiers
    
        const isbn10Id = ids?.filter(book => book.type === 'ISBN_10')[0]
        const isbn13Id = ids?.filter(book => book.type === 'ISBN_13')[0]
        
        const isbn10 = isbn10Id ? isbn10Id.identifier : null
        const isbn13 = isbn13Id ? isbn13Id.identifier : null
    
        return ( !!isbn10 && isbn10List?.includes(isbn10) ) || ( !!isbn13 && isbn13List?.includes(isbn13) ) || false
    }

    return userHasBook
}
