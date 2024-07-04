/**
 * 
 * 
 * MAIN APP TYPES AND INTERFACES
 * 
 * 
 * All main types will be stored here.
 * Store types are in /src/store/types
 * 
 * 
 * 
 */




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
    loading         : false,
    error           : null
    isAuth          : true
}

export interface AuthLoading {
    user            : null,
    token           : null,
    loading         : true,
    error           : null
    isAuth          : false
}

export interface AuthError {
    user            : null,
    token           : null,
    loading         : false,
    error           : 'LOGIN' | 'REGISTER'
    isAuth          : false
}

export interface WithoutAuth {
    user    : null,
    token   : null,
    loading : false,
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
    id          : string
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

interface UserSettings {
    currentlyReadingId : string | null
    email              : string | null
    filter             : 'all' | 'read' | 'unread' | 'favourites' | 'wishlist' | 'owned'
    location           : string | null
    name               : string | null
    sort               : 'title' | 'authors' | 'newest' | 'oldest'
    theme              : 'light' | 'dark'
    view               : 'grid' | 'list' | 'card'
}


/**
 * 
 * 
 * Book
 * 
 * 
 */


interface Book {
    id          : string
    title       : string
    authors     : string
    isbn        : {
        isbn10  : string
        isbn13  : string
    }
    image       : {
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
    id          : string
    userId      : string
    rating      : number
    review      : string
}

export interface ApiBook {
    authors      : string
    created_at   : string
    group        : 'wishlist' | 'owned'
    id           : string
    imageUrl?    : string
    imageHeight? : number
    imageWidth?  : number
    isFavourite  : boolean
    isRead       : boolean
    isbn10?      : string
    isbn13?      : string
    rating       : number
    tags         : string
    title        : string
    updated_at   : string
    userId       : string
}

export interface GoogleBook {
    kind : string
    id : string
    selfLink : string
    volumeInfo : {
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
}

export interface GoogleBookResponse {
    items : GoogleBook[]
    totalItems : number
}