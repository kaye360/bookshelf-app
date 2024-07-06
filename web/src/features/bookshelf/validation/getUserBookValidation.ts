import { ApiBook, UserBook } from "../../../types/types"


export function validateUserBook ( response : any ) {

    const bookDataValues = Object.values( response ) as unknown as ApiBook[]
    const bookDataFormatted = bookDataValues.map( book => {

        const formattedBook =  {
            ...book,
            tags: JSON.parse(book.tags || "[]"),
            image: {
                url: book.imageUrl || '',
            },
            isbn: {
                isbn10: book.isbn10 || '',
                isbn13: book.isbn13 || ''
            }
        }

        delete formattedBook.imageHeight
        delete formattedBook.imageWidth
        delete formattedBook.imageHeight
        delete formattedBook.isbn10 
        delete formattedBook.isbn13 

        return formattedBook as unknown as UserBook
    })

    return bookDataFormatted
}
