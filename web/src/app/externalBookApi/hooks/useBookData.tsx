import { useParams } from "react-router-dom"
import useSingleExternalApiAuthors from "../api/getSingleExternalApiAuthors"
import useSingleExternalApiBook from "../api/getSingleExternalApiBook"

export default function useBookData() {

    const params = useParams()

    const bookQuery = useSingleExternalApiBook(params.id)
    const authors   = useSingleExternalApiAuthors(bookQuery.data?.authors)
    const key       = bookQuery.data?.key.replaceAll('/works/', '') || ''

    return {
        bookQuery,
        authors,
        key
    }
}
