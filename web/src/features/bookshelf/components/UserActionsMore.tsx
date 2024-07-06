import { ComponentPropsWithoutRef, useState } from "react";
import { EditIcon, BookIcon, TrashIcon } from "../../../components/common/Icon";
import UserActionsMoreButton from "./UserActionsMoreButton";
import EditTagsModal from "./EditTagsModal";
import { useNavigate } from "react-router-dom";
import DeleteBookModal from "./DeleteBookModal";
import { UserBook } from "../../../types/types";


interface UserActionsMoreProps extends ComponentPropsWithoutRef<'div'> {
    book : UserBook
    isOpen : boolean
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
}

export default function UserActionsMore({book, isOpen, setIsOpen} : UserActionsMoreProps) {

    const navigate = useNavigate()

    const [ showEditTagsModal, setShowEditTagsModal ] = useState(false)
    const [ showDeleteModal, setShowDeleteModal] = useState(false)

    function handleEditTags() {
        setShowEditTagsModal(true)
        setIsOpen(false)
    }

    function handleDelete() {
        setShowDeleteModal(true)
        setIsOpen(false)
    }

    return (
        <div className={`absolute bottom-[34px] -right-[0px] overflow-hidden py-0 max-h-0 grid gap-0 bg-bg/95 rounded shadow-md transition-all duration-300 ${isOpen ? 'py-2 max-h-[150px]' : ''}`}>

            <UserActionsMoreButton onClick={ handleEditTags }>
                Edit Tags
                <EditIcon size={18} />
            </UserActionsMoreButton>

            <UserActionsMoreButton onClick={ () => navigate(`/book/${book.isbn.isbn13}`)}>
                Book Info
                <BookIcon size={18} />
            </UserActionsMoreButton>

            <UserActionsMoreButton onClick={ handleDelete }>
                Delete Book
                <TrashIcon size={18} />
            </UserActionsMoreButton>

            { showEditTagsModal && (
                <EditTagsModal 
                    book={book}
                    showModal={showEditTagsModal} 
                    setShowModal={setShowEditTagsModal}
                />
            )}

            { showDeleteModal && (
                <DeleteBookModal 
                    book={book}
                    showDeleteModal={showDeleteModal}
                    setShowDeleteModal={setShowDeleteModal}
                />
            )}
            
        </div>
    )
}
