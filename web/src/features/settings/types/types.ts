
export type Settings = UserSettings | null


export interface UserSettings {
    currentlyReadingId : string | null
    email              : string | null
    filter             : 'all' | 'read' | 'unread' | 'favourites' | 'owned' | 'wishlist'
    location           : string | null
    name               : string | null
    sort               : 'title' | 'author' | 'newest' | 'oldest'
    theme              : 'light' | 'dark'
    view               : 'grid' | 'list' | 'card'
}