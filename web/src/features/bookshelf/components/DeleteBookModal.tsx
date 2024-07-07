import Modal from "../../../components/common/Modal";
import { AlertIcon, LoaderIcon } from "../../../components/common/Icon";
import Button from "../../../components/form/Button";
import { UserBook } from "../../../types/types";
import useHandleDeleteBook from "../hooks/useHandleDeleteBook";


export default function DeleteBookModal({
    book, 
    closeModalFn
} : {
    book : UserBook
    closeModalFn : Function
}) {

    const { query, handleDeleteBook, hasClicked } = useHandleDeleteBook({book})

    const hasImage = book.image.url.includes('google')

    return (
        <Modal closeModalFn={closeModalFn}>
                
            <form onSubmit={ (e) => handleDeleteBook(e) }>

                <div className="flex items-start gap-3">

                    <AlertIcon className="min-w-[24px]" />

                    <div className="grid gap-2">
                        <h2 className="mb-4 text-md">
                            Are you sure you want to delete: <br />
                            <span className="font-bold ">
                                {book.title}
                                {book.id}
                            </span>
                        </h2>
                    </div>

                    { hasImage && (
                        <img src={book.image.url} className="hidden md:block w-20 rounded" />
                    )}

                </div>

                <div className="flex items-center gap-3">
                    <Button type="submit" variant="fill">
                        { query.isPending
                            ? <> <LoaderIcon /> Deleting Book...</>
                            : 'Delete Book'
                        }
                    </Button>
                    { hasClicked && !query.isPending && query.isSuccess && 'Book Deleted.' }
                </div>
            
            </form>

        </Modal>
    )
}
