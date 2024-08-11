import { PlusIcon, CheckIcon } from "../../../components/common/Icon"
import AddBookModal from "./AddBookModal"
import { useState } from "react"
import { CreateBook } from "../../../types/types"
import BookCover from "../../../components/common/BookCover"
import { userHasBook } from "../../bookshelf/services/userHasBook"
import { getAuthors } from "../services/getAuthors"
import { useStore } from "../../../store/store"
import { isArrayOfStrings } from "../../../utils/validation"

export default function Result({
    book, 
} : {
    book: CreateBook, 
}) {

    const { books } = useStore()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const authors = getAuthors(book.authors)

    const tagsArray = JSON.parse( book.tags )
    const tags = isArrayOfStrings( tagsArray ) 
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
                { userHasBook({key: book.key, books}) ? (
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
                    { authors  && <span className="text-lg">{ authors }</span> }
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
                        Categories : 
                        {tags.map( tag => '#' + tag + ' ')}
                        {tags.length === 0 && ' N/A'} 
                    </span>

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
