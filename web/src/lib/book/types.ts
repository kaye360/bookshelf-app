
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
        width   : number
        height  : number
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


export interface ApiBook {
    authors     : string
    created_at  : string
    group       : 'wishlist' | 'owned'
    id          : string
    imageUrl?    : string
    imageHeight? : number
    imageWidth?  : number
    isFavourite : boolean
    isRead      : boolean
    isbn10?      : string
    isbn13?      : string
    rating      : number
    tags        : string
    title       : string
    updated_at  : string
    userId      : string
}