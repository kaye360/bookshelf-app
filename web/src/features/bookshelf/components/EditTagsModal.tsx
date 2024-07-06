import Modal from "../../../components/common/Modal";
import { AlertIcon, LoaderIcon } from "../../../components/common/Icon";
import Button from "../../../components/form/Button";
import { UserBook } from "../../../types/types";
import { useUpdateUserBookTags } from "../api/updateUserBookTags";



export default function EditTagsModal({
    book, 
    closeModalFn
} : {
    book         : UserBook
    closeModalFn : Function
}) {

    const { handleSubmit, status } = useUpdateUserBookTags()

    const hasImage = book.image.url.includes('google')

    return (
        <Modal closeModalFn={closeModalFn} >

            <div className="flex items-stretch gap-3 mb-4">

                <div className="flex flex-col justify-between">

                    <h2 className="mb-4 text-md">
                        Edit tags for: <br />
                        <span className="font-bold ">
                            {book.title}
                        </span>
                    </h2>

                    <div className="flex items-center gap-2 p-3 rounded border border-primary-light text-primary-dark text-sm">
                        <AlertIcon className="min-w-[24px]" />
                        Note: Separate each tag with a space. No hashtag is required.
                    </div>

                </div>

                { hasImage && (
                    <img src={book.image.url} className="hidden md:block w-20 rounded" />
                )}

            </div>


                
            <form onSubmit={ (e) => handleSubmit(book, e) }>

                <textarea 
                    id="book-tags-textarea"
                    className="w-full border border-primary-light/30 p-3 resize-none rounded"
                    rows={3}
                    placeholder="Enter tags for this book"
                    defaultValue={book.tags.join(" ")}
                />

                <div className="flex items-center gap-3">

                    { status.isLoading && (
                        <>
                            <LoaderIcon /> 
                            <span className="text-lg font-semibold py-2">
                                Updating tags...
                            </span>
                        </>
                    )}

                    { !status.isLoading && (
                        <Button type="submit" variant="fill">
                            Update Tags
                        </Button>
                    )}

                    { status.isSuccess && 'Changes saved.' }

                </div>

            </form>

        </Modal>
    )
}
