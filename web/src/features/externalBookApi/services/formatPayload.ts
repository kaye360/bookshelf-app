import { GoogleBook, User } from "../../../types/types";


interface FormatPayload {
    title: string;
    isbn10: string;
    isbn13: string;
    imageUrl: string;
    userId: number;
    rating: number;
    group: string;
    isRead: boolean;
    tags: string;
    authors: string;
    isFavourite: boolean;
}


interface FormatPayloadProps {
    book : GoogleBook
    user : User
    isOwned : HTMLInputElement
    isRead : HTMLInputElement
}


export function formatPayload({ book, user, isOwned, isRead } : FormatPayloadProps) : FormatPayload {
    
    const payload = {
        title       : book?.volumeInfo?.title || '',
        isbn10      : book?.volumeInfo?.industryIdentifiers?.filter( id => id.type === 'ISBN_10' )[0]?.identifier || '',
        isbn13      : book?.volumeInfo?.industryIdentifiers?.filter( id => id.type === 'ISBN_13' )[0]?.identifier || '',
        imageUrl    : book?.volumeInfo?.imageLinks?.thumbnail || book?.volumeInfo?.imageLinks?.smallThumbnail || '',
        userId      : user.id,
        rating      : 0,
        group       : isOwned.checked ? 'owned' : 'wishlist',
        isRead      : isRead.checked,
        tags        : JSON.stringify([]),
        authors     : book?.volumeInfo?.authors?.join(', ') || 'N/A',
        isFavourite : false
    }

    return payload
}