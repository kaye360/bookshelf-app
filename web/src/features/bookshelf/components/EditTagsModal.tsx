import { Dispatch, SyntheticEvent, useState } from "react";
import Modal from "../../../components/common/Modal";
import { UserBook } from "../../book/types/types";
import { AlertIcon, LoaderIcon } from "../../../components/common/Icon";
import Button from "../../../components/form/Button";
import useUserProps from "../hooks/useUserProps";
import { useAuth } from "../../auth/components/AuthProvider";


interface EditTagsModalProps {
    book : UserBook
    showEditTagsModal : boolean
    setShowEditTagsModal : Dispatch<React.SetStateAction<boolean>>
}


export default function EditTagsModal({book, showEditTagsModal, setShowEditTagsModal} : EditTagsModalProps) {

    const { updateUser } = useAuth()
    const { updateTags } = useUserProps(book)

    const defaultStatus = { isLoading : false, isSuccess : false }
    const [status, setStatus] = useState(defaultStatus)

    const hasImage = book.image.url.includes('google')


    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        setStatus( prev => ({...prev, isLoading : true}) )
        const tagsInput = document.querySelector('#book-tags-textarea') as HTMLTextAreaElement
        const tags = tagsInput.value.trim().toLowerCase().split(' ').filter( tag => tag !== "")
        const query = await updateTags(tags)

        setStatus( prev => ({...prev, isLoading : false}))

        if( !query.error ) {
            updateUser()
            setStatus( prev => ({...prev, isSuccess : true}) )
            setTimeout( () => setStatus(defaultStatus), 5000 )
        }
    }

    return (
        <Modal showModal={showEditTagsModal} setShowModal={setShowEditTagsModal}>

            <div className="flex items-stretch gap-3 mb-4">

                <div className="flex flex-col justify-between">

                    <h2 className="mb-4 text-md">
                        Edit tags for: <br />
                        <span className="font-bold ">
                            {book.title}
                        </span>
                    </h2>

                    <div className="flex items-center gap-2 p-3 rounded border border-primary-light/30 text-primary-light text-sm">
                        <AlertIcon className="min-w-[24px]" />
                        Note: Separate each tag with a space. No hashtag is required.
                    </div>

                </div>

                { hasImage && (
                    <img src={book.image.url} className="hidden md:block w-20 rounded" />
                )}

            </div>


                
            <form onSubmit={handleSubmit}>

                <textarea 
                    id="book-tags-textarea"
                    className="w-full border border-primary-light/30 p-3 resize-none rounded"
                    rows={3}
                    placeholder="Enter tags for this book"
                    defaultValue={book.tags.join(" ")}
                />

                <div className="flex items-center gap-3">

                    <Button type="submit" variant="fill">
                        { status.isLoading 
                            ? <> <LoaderIcon /> Updating tags...</>
                            : 'Update Tags'
                        }
                    </Button>

                    { status.isSuccess && 'Changes saved.' }

                </div>

            </form>

        </Modal>
    )
}
