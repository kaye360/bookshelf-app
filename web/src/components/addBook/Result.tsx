import { GoogleBook } from "../../lib/book/types"
import AddBookModal from "./AddBookModal"
import useResult from "./useResult"

export default function Result({book} : {book: GoogleBook}) {

    const { showAddBookModal, setShowAddBookModal, query, isClicked, setIsClicked, formatGoogleBookResult } = useResult({book})

    const { thumbnail, title, subTitle, pageCount, identifiers, categories, authors, description } = formatGoogleBookResult(book)

    return (
        <div className='grid grid-cols-[auto_1fr] gap-3 items-start'>

            <div className="grid gap-2">
                { thumbnail && <img src={thumbnail} /> }
                { query.isSuccess && !isClicked ? (
                    <button 
                        onClick={ () => setShowAddBookModal(true) }
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
                    { title    && <h2 className="font-bold">{ title } </h2> }
                    { subTitle && <span className="text-sm font-semibold">{ subTitle }</span> }
                    { authors  && <span className="text-sm">{ authors }</span> }
                </div>

                <div className="grid text-primary-light/80 text-sm">

                    { pageCount && <span>Pages: { pageCount }</span> }

                    { identifiers && identifiers.map( id => (
                        <span className="block" key={id.type}>
                            {id.type?.replaceAll('_', ' ')}: {id.identifier}
                        </span>
                    ))}

                    { categories && <span>Category: {categories}</span> }

                </div>

                { description && <p>{description}</p> }

            </div>

            { showAddBookModal &&
                <AddBookModal 
                    showAddBookModal={showAddBookModal}
                    setShowAddBookModal={setShowAddBookModal}
                    book={book}
                    isClicked={isClicked}
                    setIsClicked={setIsClicked}
                    query={query}
                />
            }
        </div>

    )
}


function PlusIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
    )
}


function CheckIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    )
}