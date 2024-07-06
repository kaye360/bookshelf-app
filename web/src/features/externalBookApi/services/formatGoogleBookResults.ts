import { GoogleBook } from "../../../types/types"


export function formatGoogleBookResult(book: GoogleBook) {
    const thumbnail   = book?.volumeInfo?.imageLinks?.thumbnail || book?.volumeInfo?.imageLinks?.smallThumbnail || null
    const title       = book?.volumeInfo?.title || null
    const subTitle    = book?.volumeInfo?.subtitle || null
    const pageCount   = book?.volumeInfo?.pageCount || null
    const identifiers = book?.volumeInfo?.industryIdentifiers || null
    const categories  = book?.volumeInfo?.categories || null
    const authors     = book?.volumeInfo?.authors?.slice(0,5).join(', ') || null
    const description = typeof book?.volumeInfo?.description === 'string' && 
                        book?.volumeInfo?.description.length > 200
                            ? book?.volumeInfo?.description.slice(0,200) + '...'
                            : book?.volumeInfo?.description

    return { thumbnail, title, subTitle, pageCount, identifiers, categories, authors, description }
}