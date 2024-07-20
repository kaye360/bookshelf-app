import { PlusIcon, CheckIcon } from "../../../../components/common/Icon"
import AddBookModal from "./AddBookModal"
import { useState } from "react"
import useUserHasBook from "../../hooks/useUserHasBook"
import { CreateBook } from "../../../../types/types"
import BookCover from "../../../../components/common/BookCover"


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

    const tagsArray = JSON.parse( book.tags )
    const tags = Array.isArray( tagsArray ) 
        ? tagsArray.map( (tag : string) => tag.split('&') ).flat()
        : []

    return (
        <div className='grid grid-cols-[auto_1fr] gap-4 items-start'>

            <div className="grid gap-2">
                { book.imageUrl ? (
                    <BookCover 
                        size="lg"
                        title={book.title}
                        src={book.imageUrl}
                    />
                ) : (
                    <div className="px-2 pt-6 pb-36 bg-primary-light/30 rounded-md text-center">
                        No cover available
                    </div>
                )}
                { userHasBook(book) ? (
                    <span className="flex gap-2 justify-center items-center min-w-max px-6 py-2 text-sm text-accent border border-accent/30 rounded-lg w-full select-none">
                        <CheckIcon />
                        Added
                    </span>
                ):(
                    <button 
                        onClick={ () => setIsModalOpen(true) }
                        className='flex gap-2 justify-center items-center min-w-max px-6 py-2 text-sm text-accent border border-accent/30 rounded-lg w-full hover:bg-accent hover:text-bg transition-colors'
                    >
                        <PlusIcon />
                        Add
                    </button>
                )}
            </div>

            <div className='grid gap-4 justify-start'>

                <div className="grid gap-1 text-2xl">
                    { book.title    && <h2 className="font-bold">{ book.title } </h2> }
                    { book.authors  && <span className="text-lg">{ book.authors }</span> }
                </div>

                <div className="grid text-primary-dark/80 text-base">

                    { book.pageCount 
                        ? <span>Pages: { book.pageCount }</span> 
                        : '' 
                    }

                    { book.publishedDate 
                        ? <span>Published: { book.publishedDate }</span>
                        : ''
                    }

                    <span>
                        Categories : {tags.map( tag => '#' + tag + ' ')}
                    </span>

                    {book.key}

                </div>

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
