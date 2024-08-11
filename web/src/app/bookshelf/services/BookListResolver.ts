import { Book, UserSettings } from "../../../types/types"

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
interface BookListResolverConstructor {
    books        : Book[]
    searchQuery  : string | null
    filterBy     : UserSettings['filter'] | string | null
    sortBy       : string | null
}

export class BookListResolver {

    books        : Book[]
    searchQuery  : string
    filterBy     : string
    sortBy       : string

    public constructor({ books, searchQuery, filterBy, sortBy } : BookListResolverConstructor) {
        this.books       = books
        this.searchQuery = searchQuery?.toLowerCase() || ''
        this.filterBy    = filterBy || 'all'
        this.sortBy      = sortBy || 'title'
    }

    public resolve() {

        if( this.searchQuery !== '' ) {
            this.search(this.searchQuery)
        }

        if( !this.searchQuery && this.filterBy !== 'all' ) {
            this.filter(this.filterBy)
        }

        this.sort(this.sortBy)

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
                // If none of the above, then it is a tag
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
            default: 
                // Default sort by title
                this.books = this.books.sort( (a,b) => a.title !== b.title ? a.title < b.title ? -1 : 1 : 0 )
        }
    }

}