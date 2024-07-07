import { UserBook } from "../../../types/types";


export class BookListResolver {

    bookList     : UserBook[]
    searchParams : URLSearchParams

    public constructor({
        bookList,
        searchParams
    } : {
        bookList : UserBook[],
        searchParams : URLSearchParams
    }) {
        this.bookList     = bookList
        this.searchParams = searchParams
    }

    public resolve() {

        const searchQuery = this.searchParams.get('searchQuery')?.toLowerCase() || ""
        const filterBy = this.searchParams.get('filterBy') || "all"
        const sortBy      = this.searchParams.get('sortBy') || 'title'

        if( searchQuery !== '' ) {
            this.search(searchQuery)
        }

        if( !searchQuery && filterBy !== 'all' ) {
            this.filter(filterBy)
        }

        this.sort(sortBy)

        return this.bookList

    }

    private search(searchQuery : string) {

        this.bookList = this.bookList.filter( book => 
            book.authors.toLowerCase().includes( searchQuery ) || 
            book.title.toLowerCase().includes( searchQuery ) ||
            book.tags.filter( tag => tag.includes( searchQuery )).length > 0
        )
    }

    private filter(filterBy : string) {

        switch ( filterBy ) {
            case 'read':
                this.bookList = this.bookList.filter( book => !!book.isRead )
                break
            case 'unread':
                this.bookList = this.bookList.filter( book => !book.isRead )
                break
            case 'favourites':
                this.bookList = this.bookList.filter( book => !!book.isFavourite )
                break
            case 'wishlist':
                this.bookList = this.bookList.filter( book => book.group === 'wishlist' )
                break
            case 'owned':
                this.bookList = this.bookList.filter( book => book.group === 'owned' )
                break
            default :
                this.bookList = this.bookList.filter( book => book.tags.includes( filterBy ))
        }
    }

    private sort(sortBy : string) {

        switch ( sortBy ) {
            case 'title':
                this.bookList = this.bookList.sort( (a,b) => a.title !== b.title ? a.title < b.title ? -1 : 1 : 0 )
                break
            case 'authors':
                this.bookList = this.bookList.sort( (a,b) => a.authors !== b.authors ? a.authors < b.authors ? -1 : 1 : 0 )
                break
            case 'newest':
                this.bookList = this.bookList.sort( (a,b) => a.created_at < b.created_at ? 1 : -1 )
                break
            case 'oldest':
                this.bookList = this.bookList.sort( (a,b) => a.created_at > b.created_at ? 1 : -1 )
                break
        }
    }

}