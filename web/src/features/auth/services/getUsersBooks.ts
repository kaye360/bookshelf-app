import { API_URL } from "../../../config"
import { UserBook, ApiBook } from "../../book/types/types"

export async function getUserBooks(userId : string) : Promise<UserBook[]> {
    const response = await fetch(`${API_URL}/bookshelf/${userId}`)
    const json = await response.json()
    const bookDataValues = Object.values( json ) as unknown as ApiBook[]
    const bookDataFormatted = bookDataValues.map( book => {

        const formattedBook =  {
            ...book,
            tags: JSON.parse(book.tags || "[]"),
            image: {
                url: book.imageUrl || '',
                width: book.imageWidth || 0,
                height: book.imageHeight || 0
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