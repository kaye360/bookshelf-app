import Button from "../../../components/form/Button"
import Result from "./Result"
import useUserHasBook from "../../externalBookApi/hooks/useUserHasBook"
import { GoogleBook } from "../../book/types/types"


interface ResultListProps {
    bookList : GoogleBook[]
    hasMoreBooks : boolean
    nextPage : () => void
}


export default function ResultList( {bookList, hasMoreBooks, nextPage} : ResultListProps ) {

    const userHasBook = useUserHasBook()

    return (
        <div className='grid gap-16 w-full max-w-3xl'>

            { bookList.map( (book, i) => (
                <Result 
                    userHasBook={userHasBook(book)}
                    book={book} 
                    key={i} 
                />
            ))}

            { hasMoreBooks && (
                <Button 
                    variant="ghost"
                    onClick={ nextPage }
                >
                    Load More Results
                </Button>
            )}

        </div>

    )
}