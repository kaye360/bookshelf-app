import { API_URL } from "../../config"
import { UserBook, ApiBook } from "./types"

export async function getUserBooks(userId : string) : Promise<UserBook[]> {
    const bookResponse = await fetch(`${API_URL}/bookshelf/${userId}`)
    const bookData = await bookResponse.json()
    const bookDataValues = Object.values( bookData ) as unknown as ApiBook[]
    const bookDataFormatted = bookDataValues.map( book => {

        const formattedBook =  {
            ...book,
            tags: JSON.parse(book.tags),
            image: {
                url: book.imageUrl,
                width: book.imageWidth,
                height: book.imageHeight
            },
            isbn: {
                isbn10: book.isbn10,
                isbn13: book.isbn13
            }
        }

        delete formattedBook.imageHeight
        delete formattedBook.imageWidth
        delete formattedBook.imageHeight
        delete formattedBook.isbn10 
        delete formattedBook.isbn13 

        return formattedBook as UserBook
    })

    return bookDataFormatted
}