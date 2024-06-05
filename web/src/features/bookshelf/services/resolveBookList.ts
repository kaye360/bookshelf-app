import { UserBook } from "../../book/types/types"

export function resolveBookList(bookList : UserBook[], searchParams : URLSearchParams) : UserBook[] {

    const searchQuery = searchParams.get('searchQuery')?.toLowerCase() || ""
    const filterBy    = searchParams.get('filterBy') || "all"
    const sortBy      = searchParams.get('sortBy') || 'title'

    if( searchQuery !== "" ) {
        bookList = bookList.filter( book => 
            book.authors.toLowerCase().includes( searchQuery ) || 
            book.title.toLowerCase().includes( searchQuery ) 
        )
    }

    if( !searchQuery && filterBy !== 'all') {

        switch ( filterBy ) {
            case 'read':
                bookList = bookList.filter( book => !!book.isRead )
                break
            case 'unread':
                bookList = bookList.filter( book => !book.isRead )
                break
            case 'favourite':
                bookList = bookList.filter( book => !!book.isFavourite )
                break
            default :
                bookList = bookList.filter( book => book.tags.includes( filterBy ))
        }
    }
    
    switch ( sortBy ) {
        case 'title':
            bookList = bookList.sort( (a,b) => a.title !== b.title ? a.title < b.title ? -1 : 1 : 0 )
            break
        case 'authors':
            bookList = bookList.sort( (a,b) => a.authors !== b.authors ? a.authors < b.authors ? -1 : 1 : 0 )
            break
        case 'newest':
            bookList = bookList.sort( (a,b) => a.created_at < b.created_at ? 1 : -1 )
            break
        case 'oldest':
            bookList = bookList.sort( (a,b) => a.created_at > b.created_at ? 1 : -1 )
            break
    }

    return bookList
}