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
    
    books        : Book[],
    booksStatus   : 'LOADING' | 'ERROR' | 'SUCCESS'
    booksActions : {
        updateBooks      : (newBooks : Book[]) => void
        updateBookStatus : (newStatus : Store['booksStatus']) => void
        clearBooks       : () => void
    }

    settings        : Settings,
    settingsStatus  : 'LOADING' | 'ERROR' | 'SUCCESS',
    settingsActions : {
        updateSettings : (newSettings : Settings) => void,
        updateSettingsStatus : (newStatus : Store['settingsStatus']) => void
    }
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
 * User, Profile
 * 
 * 
 */


export interface User {
    id          : number
    handle      : string  
    email       : string 
}

export interface Profile {
    userId     : string,
    location   : string,
    tags       : string[],
    joined     : string,
    totalBooks : number
    books    : {
        key: string
        title: string
        imageUrl: string
        authors: string[]
        pageCount: number
    }[]
}

/**
 * 
 * 
 * Settings
 * 
 * 
 */


export type Settings = UserSettings

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
 * @type [Book, CommunityBook] extends Book
 * These are the books used throughout the App
 * 
 */


export interface Book {
    id            : number
    key           : string
    title         : string
    authors       : string
    imageUrl      : string | null
    userId        : number
    group         : 'wishlist' | 'owned'
    isRead        : boolean
    tags          : string[]
    isFavourite   : boolean
    pageCount     : number | null
    publishedDate : string | null
    created_at    : string
}

export interface CreateBook extends Omit<Book, 'id' | 'created_at' | 'tags'>  {
    tags : string
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

export interface ExternalApiBookResponse {
    numFound : number
    docs : ExternalApiDoc[]
}

export interface ExternalApiDoc {
    author_name        : string[]
    first_publish_year : number
    key                : string
    title              : string
    number_of_pages_median : number
    cover_edition_key  : string
    cover_i            : number
    subject            : string[]
}

export interface ExternalApiBook {
    authors? : {
        author? : {
            key : string
        }
    }[]
    covers? : number[]
    description? : {
        value? : string
    },
    key : string
    title : string,
    first_publish_date? : string
}

export interface ExternalApiAuthor {
    birth_date : string
    death_date : string
    name : string
    photos : number[]
    bio? : {
        value? : string
    }
    key : string
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
    filterBy    : UserSettings['filter']
    taggedAs    : string
    searchQuery : string
}


/** 
 * 
 * 
 * Community Feed
 * 
 */

export interface CommunityPost {
    id         : number
    userId     : number
    userHandle : string
    type       : 'CREATE_BOOK' | 'FAVOURITE_BOOK' | 'READ_BOOK' | 'CREATE_REVIEW' | 'JOIN'
    title      : string
    key        : string
    imageUrl   : string | null
    created_at : string
}