import { GoogleBook } from "../../book/types/types"
import { PlusIcon, CheckIcon } from "../../../components/common/Icon"
import AddBookModal from "./AddBookModal"
import { formatGoogleBookResult } from "../../externalBookApi/services/formatGoogleBookResults"
import useAddExternalApiBook from "../../externalBookApi/hooks/useAddExternalApiBook"
import { useState } from "react"
import useUserHasBook from "../hooks/useUserHasBook"

/**
 * 
 * @parent routes/add/<AddBook />
 * 
 */
export default function Result({
    book, 
} : {
    book: GoogleBook, 
}) {

    const result      = useAddExternalApiBook({book})
    const googleBook  = formatGoogleBookResult(book)
    const userHasBook = useUserHasBook()

    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className='grid grid-cols-[auto_1fr] gap-3 items-start'>

            <div className="grid gap-2">
                { googleBook.thumbnail && <img src={googleBook.thumbnail} /> }
                { result.query.isSuccess && !userHasBook(book) ? (
                    <button 
                        onClick={ () => setIsModalOpen(true) }
                        className='flex gap-2 justify-center items-center min-w-max px-6 py-2 text-sm text-accent border border-accent/30 rounded-lg w-full hover:bg-accent hover:text-bg transition-colors'
                    >
                        <PlusIcon />
                        Add
                    </button>
                ):(
                    <span className="flex gap-2 justify-center items-center min-w-max px-6 py-2 text-sm text-accent border border-accent/30 rounded-lg w-full select-none">
                        <CheckIcon />
                        Added
                    </span>
                )}
            </div>

            <div className='grid gap-4 justify-start'>

                <div className="grid gap-1">
                    { googleBook.title    && <h2 className="font-bold">{ googleBook.title } </h2> }
                    { googleBook.subTitle && <span className="text-sm font-semibold">{ googleBook.subTitle }</span> }
                    { googleBook.authors  && <span className="text-sm">{ googleBook.authors }</span> }
                </div>

                <div className="grid text-primary-dark/80 text-sm">

                    { googleBook.pageCount && <span>Pages: { googleBook.pageCount }</span> }

                    { googleBook.identifiers && googleBook.identifiers.map( id => (
                        <span className="block" key={id.type}>
                            {id.type?.replaceAll('_', ' ')}: {id.identifier}
                        </span>
                    ))}

                    { googleBook.categories && <span>Category: {googleBook.categories}</span> }

                </div>

                { googleBook.description && <p>{googleBook.description}</p> }

            </div>

            { isModalOpen && (
                <AddBookModal 
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    book={book}
                    isBookAdded={result.isBookAdded}
                    setIsBookAdded={result.setIsBookAdded}
                    query={result.query}
                    errorMessage={result.errorMessage}
                />
            )}
            
        </div>

    )
}
