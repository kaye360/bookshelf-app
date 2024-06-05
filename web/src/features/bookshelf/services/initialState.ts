import { BookShelfContextProps } from "../types/types"


export const bookshelfOptionsInitialState = {
    viewAs        : 'grid',
    sortBy        : 'title',
    filterBy      : "all",
    searchQuery : "",
}


export const bookShelfContextInitialState : BookShelfContextProps = {
    searchParams : bookshelfOptionsInitialState,
    setSearchParams :  () => {},
    updateSearchParam : () => {}
}