import { PlusIcon, CheckIcon } from "../../../../components/common/Icon"
import AddBookModal from "./AddBookModal"
import { useState } from "react"
import useUserHasBook from "../../hooks/useUserHasBook"
import { CreateBook } from "../../../../types/types"


/**
 * 
 * @parent routes/add/<AddBook />
 * 
 */
export default function Result({
    book, 
} : {
    book: CreateBook, 
}) {

    const userHasBook = useUserHasBook()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [expandDescription, setExpandDescription] = useState(false)

    const tagsArray = JSON.parse( book.tags )
    const tags = Array.isArray( tagsArray ) 
        ? tagsArray.map( (tag : string) => tag.split('&') ).flat()
        : []

    return (
        <div className='grid grid-cols-[auto_1fr] gap-3 items-start'>

            <div className="grid gap-2">
                { book.imageUrl && <img src={book.imageUrl} /> }
                { !userHasBook(book) ? (
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
                    { book.title    && <h2 className="font-bold">{ book.title } </h2> }
                    { book.subTitle && <span className="text-sm font-semibold">{ book.subTitle }</span> }
                    { book.authors  && <span className="text-sm">{ book.authors }</span> }
                </div>

                <div className="grid text-primary-dark/80 text-sm">

                    { book.pageCount && <span>Pages: { book.pageCount }</span> }

                    <span>
                        ISBN10 : {book.isbn10}
                    </span>

                    <span>
                        ISBN13 : {book.isbn13}
                    </span>

                    <span>
                        Categories : {tags.map( tag => tag + ' ')}
                    </span>

                </div>

                { book.description && (
                    <p>
                        { expandDescription ? (
                            <>
                                {book.description}
                            </>
                        ) : (
                            <>
                                {book.description.slice(0,200)}
                                {book.description.length > 200 && (
                                    <>
                                        ...
                                        <button 
                                            onClick={ () => setExpandDescription(true) }
                                            className="mx-4 border-b border-accent"
                                        >
                                            Read More
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                    </p> 
                )}

            </div>

            { isModalOpen && (
                <AddBookModal 
                    book={book} 
                    closeModalFn={ () => setIsModalOpen(false )}
                />
            )}
            
        </div>

    )
}
