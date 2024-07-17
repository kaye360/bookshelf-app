import { Book } from "../../../types/types"

/**
 * @class BookListResolver
 * 
 * @description 
 * Use this class to resolve any filtering and sorting applyed to a UserBooks Array.
 * Used in useSearchBarParams.
 * 
 * @method resolve() : UserBook.
 * Instantiate the class and then call it with the resolve() method to access sorted/filtered book list.
 * 
 */
export class BookListResolver {

    books        : Book[]
    searchParams : URLSearchParams

    public constructor({
        books,
        searchParams
    } : {
        books        : Book[],
        searchParams : URLSearchParams
    }) {
        this.books     = books
        this.searchParams = searchParams
    }

    public resolve() {

        const searchQuery = this.searchParams.get('searchQuery')?.toLowerCase() || ""
        const filterBy    = this.searchParams.get('filterBy') || "all"
        const sortBy      = this.searchParams.get('sortBy') || 'title'

        if( searchQuery !== '' ) {
            this.search(searchQuery)
        }

        if( !searchQuery && filterBy !== 'all' ) {
            this.filter(filterBy)
        }

        this.sort(sortBy)

        return this.books
    }

    private search(searchQuery : string) {

        this.books = this.books.filter( book => 
            book.authors.toLowerCase().includes( searchQuery ) || 
            book.title.toLowerCase().includes( searchQuery ) ||
            book.tags.filter( tag => tag.includes( searchQuery )).length > 0
        )
    }

    private filter(filterBy : string) {

        switch ( filterBy ) {
            case 'read':
                this.books = this.books.filter( book => !!book.isRead )
                break
            case 'unread':
                this.books = this.books.filter( book => !book.isRead )
                break
            case 'favourites':
                this.books = this.books.filter( book => !!book.isFavourite )
                break
            case 'wishlist':
                this.books = this.books.filter( book => book.group === 'wishlist' )
                break
            case 'owned':
                this.books = this.books.filter( book => book.group === 'owned' )
                break
            default :
                this.books = this.books.filter( book => book.tags.includes( filterBy ))
        }
    }

    private sort(sortBy : string) {

        switch ( sortBy ) {
            case 'title':
                this.books = this.books.sort( (a,b) => a.title !== b.title ? a.title < b.title ? -1 : 1 : 0 )
                break
            case 'authors':
                this.books = this.books.sort( (a,b) => a.authors !== b.authors ? a.authors < b.authors ? -1 : 1 : 0 )
                break
            case 'newest':
                this.books = this.books.sort( (a,b) => a.created_at < b.created_at ? 1 : -1 )
                break
            case 'oldest':
                this.books = this.books.sort( (a,b) => a.created_at > b.created_at ? 1 : -1 )
                break
        }
    }

}