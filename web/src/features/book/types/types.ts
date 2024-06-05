
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