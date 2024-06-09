import { SetURLSearchParams } from "react-router-dom"


export interface BookshelfParams {
    viewAs      : 'grid' | 'list' | 'card'
    sortBy      : 'title' | 'authors' | 'newest' | 'oldest'
    filterBy    : 'all' | 'read' | 'unread' | 'favourite' | 'wishlist' | 'owned' | string
    searchQuery : string
}

export interface BookShelfContextProps {
    searchParams : any, 
    setSearchParams : SetURLSearchParams
    updateSearchParam : <K extends keyof BookshelfParams>(param : K, value: BookshelfParams[K]) => void
}
