/**
 * 
 * 
 * MAIN APP TYPES AND INTERFACES
 * 
 * 
 * All main types will be stored here.
 * 
 * 
 * 
 */



/**
 * 
 * 
 * Store
 * 
 */


export interface Store {
    auth        : Auth
    authActions : {
        updateAuth : (
            action : AuthActions, 
            user?  : User,
            token? : string
        ) => void
    }
    
    books        : UserBook[],
    booksStatus   : 'LOADING' | 'ERROR' | 'SUCCESS'
    booksActions : {
        updateBooks      : (newBooks : UserBook[]) => void
        updateBookStatus : (newStatus : Store['booksStatus']) => void
    }

    settings        : Settings
    settingsActions : {
        updateSettings : (newSettings : Settings) => void
    }

    tooltip : Tooltip
    updateTooltip : (newTooltip : Tooltip) => void
}

export type AuthActions = 'LOADING' | 'LOGIN' | 'LOGIN_ERROR' | 'REGISTER' | 'REGISTER_ERROR' | 'LOGOUT'

export type Tooltip = {
    message : string,
    x : string,
    y : string
} | null

/**
 * 
 * 
 * Auth 
 * 
 * 
 */


export type Auth = AuthSuccess | AuthLoading | AuthError | WithoutAuth

export interface AuthSuccess {
    user            : User,
    token           : string,
    error           : null
    isAuth          : true
}

export interface AuthLoading {
    user            : null,
    token           : null,
    error           : null
    isAuth          : false
}

export interface AuthError {
    user            : null,
    token           : null,
    error           : 'LOGIN' | 'REGISTER' | 'SESSION'
    isAuth          : false
}

export interface WithoutAuth {
    user    : null,
    token   : null,
    error   : null,
    isAuth  : false,
}

export interface LoginPayload {
    handle   : string 
    password : string
}

export interface RegisterPayload {
    handle          : string
    email           : string
    name            : string
    password        : string
    password_confirmation : string
}


/**
 * 
 * 
 * User
 * 
 * 
 */


export interface User {
    id          : number
    name        : string
    handle      : string  
    email       : string 
}


/**
 * 
 * 
 * Settings
 * 
 * 
 */


export type Settings = UserSettings | null

export interface UserSettings {
    currentlyReadingId : string | null
    email              : string | null
    location           : string | null
    name               : string | null
    filter             : 'all' | 'read' | 'unread' | 'favourites' | 'wishlist' | 'owned'
    sort               : 'title' | 'authors' | 'newest' | 'oldest'
    theme              : 'light' | 'dark'
    view               : 'grid' | 'list' | 'card'
}


/**
 * 
 * Book
 * 
 * @type [UserBook, CommunityBook] extends Book
 * These are the books used throughout the App
 * 
 * @type UserModelBook extends CreateUserModelBook
 * These represent the UserBook DB model
 * UserModelBook will have extra properties such as Id
 * 
 */


interface Book {
    id          : number
    title       : string
    authors     : string
    isbn : {
        isbn10  : string
        isbn13  : string
    }
    image : {
        url     : string
    }
}

export interface UserBook extends Book {
    userId      : string
    rating      : number
    group       : 'wishlist' | 'owned'
    isRead      : boolean
    tags        : string[]
    isFavourite : boolean
    created_at  : string
}

export interface CommunityBook extends Book {
    description : string
    pages       : number
    reviews     : BookReview[]
}

export interface BookReview {
    id     : string
    userId : string
    rating : number
    review : string
}

export interface CreateUserModelBook {
    authors      : string
    group        : 'wishlist' | 'owned'
    imageUrl?    : string | null
    isFavourite  : boolean
    isRead       : boolean
    isbn10       : string
    isbn13       : string
    rating       : number
    tags         : string
    title        : string
    userId       : string
}

export interface UserModelBook extends CreateUserModelBook {
    id         : string
    created_at : string
}

export interface ExternalApiBookResponse {
    totalItems : number
    items? : {
        kind? : string
        id? : string
        selfLink? : string
        volumeInfo? : {
            title? : string
            subtitle? : string
            authors? : string[]
            publisher? : string
            publishedDate? : string
            description? : string
            industryIdentifiers? :  { 
                type? : "ISBN_13" | "ISBN_10"
                identifier? : string
            }[]
            pageCount? : number
            categories? : string[]
            imageLinks? :{
                smallThumbnail? : string
                thumbnail? : string
            }
        }
    }[]
}



/**
 * 
 * 
 * BookShelf
 * 
 */


export interface BookshelfParams {
    viewAs      : UserSettings['view']
    sortBy      : UserSettings['sort']
    filterBy    : UserSettings['filter'] | string
    searchQuery : string
}