import { SetURLSearchParams } from "react-router-dom"

export type BookshelfFilters = 'all' | 'read' | 'unread' | 'favourite' | 'wishlist' | 'owned'

export type BookshelfViews = 'grid' | 'list' | 'card'

export type BookshelfSorts = 'title' | 'authors' | 'newest' | 'oldest'

export interface BookshelfParams {
    viewAs      : BookshelfViews
    sortBy      : BookshelfSorts
    filterBy    : BookshelfFilters | string
    searchQuery : string
}

export interface BookShelfContextProps {
    searchParams : any, 
    setSearchParams : SetURLSearchParams
    updateSearchParam : <K extends keyof BookshelfParams>(param : K, value: BookshelfParams[K]) => void
}
