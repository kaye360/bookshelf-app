import Modal from "../../../components/common/Modal";
import { AlertIcon, LoaderIcon } from "../../../components/common/Icon";
import Button from "../../../components/form/Button";
import { Book } from "../../../types/types";
import useHandleDeleteBook from "../hooks/useHandleDeleteBook";


export default function DeleteBookModal({
    book, 
    closeModalFn
} : {
    book : Book
    closeModalFn : Function
}) {

    const { query, handleDeleteBook } = useHandleDeleteBook({book})

    return (
        <Modal closeModalFn={closeModalFn}>
                
            <form onSubmit={ (e) => handleDeleteBook(e) }>

                <div className="flex items-start gap-3">

                    <AlertIcon size={28} />

                    <div className="grid gap-4 text-md">
                        <span>
                            Are you sure you want to delete: <br />
                            <span className="font-bold ">
                                {book.title}
                            </span>
                        </span>

                        <Button type="submit" variant="outline">
                            { query.isPending
                                ? <> <LoaderIcon /> Deleting Book...</>
                                : 'Delete Book'
                            }
                        </Button>
                    </div>

                    <div className="w-[24px]" />

                </div>
        
            </form>

        </Modal>
    )
}
