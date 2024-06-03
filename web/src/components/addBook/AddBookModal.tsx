import { createPortal } from "react-dom";
import Modal from "../base/Modal";
import { GoogleBook } from "../../lib/book/types";
import Button from "../form/Button";
import { SyntheticEvent } from "react";
import { UseQueryResult } from "@tanstack/react-query";


interface AddBookModalProps {
    showAddBookModal : boolean
    setShowAddBookModal : React.Dispatch<React.SetStateAction<boolean>>
    book : GoogleBook
    isClicked : boolean
    setIsClicked : React.Dispatch<React.SetStateAction<boolean>>
    query : UseQueryResult<any, Error>
}

export default function AddBookModal({ book, showAddBookModal, setShowAddBookModal, query, isClicked, setIsClicked} : AddBookModalProps) {

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        setIsClicked(true)
    }

    const { isError, isFetching, isSuccess } = query

    return (
        <>
            { createPortal(
                <Modal
                    showModal={ showAddBookModal }
                    setShowModal={ setShowAddBookModal }
                >
                    <div className="flex items-center gap-3 text-primary-light">
                        <img src={book.volumeInfo.imageLinks?.thumbnail} />
                        <div className="grid gap-2">
                            <h2 className="text-xl font-bold">
                                {book.volumeInfo.title}
                            </h2>
                            <span className="font-semibold">
                                {book.volumeInfo.subtitle}
                            </span>
                            <span>
                                {book.volumeInfo.authors?.slice(0,5).join(', ')}
                            </span>
                        </div>
                    </div>

                    <form 
                        className="grid gap-3 mt-5 text-primary-light"
                        onSubmit={ handleSubmit }
                        id="addBookForm"
                    >

                        <label className="flex items-center gap-2 group relative">

                            <span className="hidden group-has-[:checked]:block">
                                <CheckIcon />
                            </span>

                            <span className="block group-has-[:checked]:hidden">
                                <UncheckIcon />
                            </span>

                            <input 
                                type="checkbox" 
                                defaultChecked 
                                name="isRead"
                                id="isRead"
                                className="opacity-0 absolute" 
                            />

                            <span className="select-none cursor-pointer">
                                I have read this book
                            </span>

                        </label>

                        <label className="flex items-center gap-2 group relative">

                            <span className="hidden group-has-[:checked]:block">
                                <CheckIcon />
                            </span>

                            <span className="block group-has-[:checked]:hidden">
                                <UncheckIcon />
                            </span>

                            <input 
                                type="checkbox" 
                                name="isOwned"
                                id="isOwned"
                                defaultChecked 
                                className="opacity-0 absolute" 
                            />

                            <span className="select-none cursor-pointer">
                                I own this book
                            </span>

                        </label>

                        { !isFetching && !isClicked && (
                            <Button 
                                type="submit"
                            >
                                Add Book
                            </Button>
                        )}


                        <div className="flex items-center gap-2 justify-center text-xl font-semibold">
                            { isFetching && (
                                <>
                                    <LoaderIcon />
                                    Adding Book...
                                </>
                            )}
                            { !isFetching && isSuccess && isClicked && (
                                <>
                                    <CheckIcon />
                                    Book Added! 
                                </>
                            )}
                        </div>


                    </form>
                </Modal>,
                document.body
            )}
        </>
    )
}


function CheckIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    )
}


function UncheckIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>
    )
}


function LoaderIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-loader animate-spin"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
    )
}

