import Modal from "../../../../components/common/Modal";
import Button from "../../../../components/form/Button";
import { CheckIcon, UncheckIcon, LoaderIcon, AlertIcon } from "../../../../components/common/Icon";
import { CreateBook } from "../../../../types/types";
import useHandleCreateBook from "../../hooks/useHandleCreateBook";
import BookCover from "../../../../components/common/BookCover";

export default function AddBookModal({ 
    book, 
    closeModalFn
} : {
    book         : CreateBook
    closeModalFn : Function
}) {

    const {
        handleCreateBook,
        query,
        errorMessage,
        isBookAdded,
    } = useHandleCreateBook()

    const { isError, isPending, isSuccess } = query

    return (
        <Modal closeModalFn={closeModalFn} >

            <div className="flex items-center gap-3 md:min-w-[350px]">

                { book.imageUrl && (
                    <BookCover
                        size="md"
                        title={book.title}
                        src={book.imageUrl}
                    />
                )}

                <div className="grid gap-2">

                    <h2 className="text-xl font-bold">
                        {book?.title}
                    </h2>

                    <span>
                        {book?.authors}
                    </span>

                </div>
            </div>

            <form 
                className="grid gap-3 mt-5 text-primary-dark"
                onSubmit={ (e) => handleCreateBook(book, e) }
                id="addBookForm"
            >

                <label className="flex items-center gap-2 group relative hover:text-accent">

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

                <label className="flex items-center gap-2 group relative hover:text-accent">

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

                { !isPending && !isBookAdded && (
                    <Button type="submit">
                        Add Book
                    </Button>
                )}

                <div className="flex items-center gap-2 justify-center text-xl font-semibold">
                    { isPending && (
                        <>
                            <LoaderIcon />
                            Adding Book...
                        </>
                    )}
                    { !isPending && isSuccess && isBookAdded && (
                        <div className="grid gap-1">
                            <div className="flex items-center gap-2">
                                <CheckIcon />
                                Book Added! 
                            </div>
                            <button
                                onClick={ () => closeModalFn() }
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

