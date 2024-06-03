import { UseAddBook } from "../../routes/add/types"
import Result from "./Result"


export default function ResultList({data} : UseAddBook['resultsProps'] ) {
    return (
        <div className='grid gap-8 w-full max-w-3xl'>

            { data?.items.map( book => (
                <Result book={book} key={book.id} />
            ))}

        </div>

    )
}

