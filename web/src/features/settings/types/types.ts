import { BookshelfFilters, BookshelfSorts, BookshelfViews } from "../../bookshelf/types/types"

export type Settings = UserSettings | null


export interface UserSettings {
    currentlyReadingId : string | null
    email              : string | null
    filter             : BookshelfFilters
    location           : string | null
    name               : string | null
    sort               : BookshelfSorts
    theme              : 'light' | 'dark'
    view               : BookshelfViews
}