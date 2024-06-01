import { SetURLSearchParams } from "react-router-dom"

export interface BookshelfParams extends URLSearchParams {
    viewAs        : 'grid' | 'list' | 'card'
    sortBy        : 'title' | 'authors' | 'newest' | 'oldest'
    filterBy      : 'all' | 'read' | 'unread' | 'favourite' | string
    searchQuery : string
}

export const bookshelfOptionsInitialState = {
    viewAs        : 'grid',
    sortBy        : 'title',
    filterBy      : "all",
    searchQuery : "",
}

export interface BookShelfContextProps {
    searchParams : any, 
    setSearchParams : SetURLSearchParams
}

export const bookShelfContextInitialState : BookShelfContextProps = {
    searchParams : bookshelfOptionsInitialState,
    setSearchParams :  () => {},
}