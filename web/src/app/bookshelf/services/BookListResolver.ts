import { Book, UserSettings } from "../../../types/types"
import { isString } from "../../../utils/validation"

/**
 * @class BookListResolver
 * 
 * @description 
 * Use this class to resolve any filtering and sorting applyed to a Books Array.
 * 
 * @method resolve() : Book[]
 * Instantiate the class and then call it with the resolve() method to access sorted/filtered book list.
 * 
 */
interface BookListResolverConstructor {
    books        : Book[]
    sortBy       : UserSettings['sort']
    filterBy     : UserSettings['filter']
    taggedAs     : string | null
    searchQuery  : string | null
}

export class BookListResolver {

    private books        : Book[]
    private sortBy       : UserSettings['sort']
    private filterBy     : UserSettings['filter']
    private taggedAs     : string | null
    private searchQuery  : string

    public constructor({ books, searchQuery, filterBy, taggedAs, sortBy } : BookListResolverConstructor) {
        this.books       = books
        this.searchQuery = searchQuery?.toLowerCase() || ''
        this.filterBy    = filterBy
        this.sortBy      = sortBy
        this.taggedAs    = taggedAs
    }

    public resolve() {

        // Determine if searchQuery first
        if( this.searchQuery !== ''  ) {
            this.search(this.searchQuery)
        }

        // Then Determine Tag
        if( !this.searchQuery && isString( this.taggedAs ) ) {
            this.tag(this.taggedAs)
        }

        // Then Determine Filters
        if( !this.searchQuery && this.filterBy !== 'all' && !this.taggedAs ) {
            this.filter(this.filterBy)
        }

        // Then sort
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

    private tag(taggedAs : string) {
        this.books = this.books.filter( book => book.tags.includes( taggedAs ))
    }

    private filter(filterBy : UserSettings['filter']) {

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
        }
    }

    private sort(sortBy : UserSettings['sort']) {

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