import { createPortal } from "react-dom";
import Modal from "../base/Modal";
import { GoogleBook } from "../../lib/book/types";
import Button from "../form/Button";
import { SyntheticEvent } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { CheckIcon, UncheckIcon, LoaderIcon } from "../base/Icon";


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

