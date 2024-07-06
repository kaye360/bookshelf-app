import Modal from "../../../components/common/Modal";
import Button from "../../../components/form/Button";
import { SyntheticEvent } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { CheckIcon, UncheckIcon, LoaderIcon, AlertIcon } from "../../../components/common/Icon";
import { GoogleBook } from "../../../types/types";

/**
 * 
 * @parent <Result />
 * 
 */
export default function AddBookModal({ 
    book, 
    isModalOpen, 
    setIsModalOpen, 
    query, 
    isBookAdded, 
    setIsBookAdded, 
    errorMessage
} : {
    book            : GoogleBook
    isModalOpen     : boolean
    setIsModalOpen  : React.Dispatch<React.SetStateAction<boolean>>
    query           : UseQueryResult<any, Error>
    isBookAdded     : boolean
    setIsBookAdded  : React.Dispatch<React.SetStateAction<boolean>>
    errorMessage    : string | null
}) {

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        query.refetch()
        setIsBookAdded(true)
    }


    const { isError, isFetching, isSuccess } = query

    return (
        <Modal
            showModal={ isModalOpen }
            setShowModal={ setIsModalOpen }
        >
            <div className="flex items-center gap-3 darklight">
                <img src={book?.volumeInfo?.imageLinks?.thumbnail} />
                <div className="grid gap-2">
                    <h2 className="text-xl font-bold">
                        {book?.volumeInfo?.title}
                    </h2>
                    <span className="font-semibold">
                        {book?.volumeInfo?.subtitle}
                    </span>
                    <span>
                        {book?.volumeInfo?.authors?.slice(0,5).join(', ')}
                    </span>
                </div>
            </div>

            <form 
                className="grid gap-3 mt-5 text-primary-dark"
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

                { !isFetching && !isBookAdded && (
                    <Button type="submit">
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
                    { !isFetching && isSuccess && isBookAdded && (
                        <div className="grid gap-1">
                            <div className="flex items-center gap-2">
                                <CheckIcon />
                                Book Added! 
                            </div>
                            <button
                                onClick={ () => setIsModalOpen(false) }
                                className="text-sm font-medium text-center hover:underline"
                            >
                                Close
                            </button>
                        </div>
                    )}

                    { isError && (
                        <>
                            <AlertIcon />
                            { errorMessage ? errorMessage : 'Something went wrong, please try again. ' }
                        </>
                    )}
                </div>

            </form>
        </Modal>
    )
}

