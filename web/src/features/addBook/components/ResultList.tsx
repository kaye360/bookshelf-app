import { useState } from "react"
import { UseAddBook } from "../../../routes/add/types"
import Button from "../../../components/form/Button"
import Result from "./Result"


export default function ResultList({data} : UseAddBook['resultsProps'] ) {

    const [page, setPage] = useState<number>(1)

    const bookList     = data?.items ? data.items.slice(0, page * 7) : []
    const totalBooks   = data?.items.length ? data.items.length : 0
    const hasMoreBooks =  page * 7 < totalBooks

    return (
        <div className='grid gap-8 w-full max-w-3xl'>

            { bookList.map( book => (
                <Result book={book} key={book.id} />
            ))}

            { hasMoreBooks && (
                <Button 
                    variant="ghost"
                    onClick={ () => setPage(page + 1) }
                >
                    Load More Results
                </Button>
            )}

        </div>

    )
}