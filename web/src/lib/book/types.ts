
export interface Book {
    id          : string
    title       : string
    authors     : string
    isbn        : {
        isbn10  : string
        isbn13  : string
    }
    image       : {
        url     : string
        width   : string
        height  : string
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

export interface GlobalBook extends Book {
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