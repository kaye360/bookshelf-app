import { ComponentPropsWithoutRef, Dispatch, SetStateAction, useEffect, useState } from "react";
import EditTagsModal from "./EditTagsModal";
import { useNavigate } from "react-router-dom";
import DeleteBookModal from "./DeleteBookModal";
import { EditIcon, BookIcon, TrashIcon } from "../../../../components/common/Icon";
import { Book } from "../../../../types/types";
import UserActionsMenuButton from "./UserActionsMenuButton";

interface UserActionsMenuProps extends ComponentPropsWithoutRef<'div'> {
    book : Book
    isOpen : boolean
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
}

export default function UserActionsMenu({book, isOpen, setIsOpen} : UserActionsMenuProps) {

    const navigate = useNavigate()

    const [ showEditTagsModal, setShowEditTagsModal ] = useState(false)
    const [ showDeleteModal, setShowDeleteModal] = useState(false)
    const id = 'bookShelfItem' + book.id

    useEventHandler({id, isOpen, setIsOpen})

    function handleEditTags() {
        setShowEditTagsModal(true)
        setIsOpen(false)
    }

    function handleDelete() {
        setShowDeleteModal(true)
        setIsOpen(false)
    }

    return (
        <div 
            id={id}
            className={`absolute bottom-[34px] right-0 z-50 w-full min-w-fit overflow-hidden py-0 max-h-0 grid gap-0 bg-bg/95 rounded shadow-md transition-all duration-300 ${isOpen ? 'py-2 max-h-[150px]' : ''}`}
        >

            <UserActionsMenuButton onClick={ handleEditTags }>
                Edit Tags
                <EditIcon size={18} />
            </UserActionsMenuButton>

            <UserActionsMenuButton onClick={ () => navigate(`/book/${book.key}`)}>
                Book Info
                <BookIcon size={18} />
            </UserActionsMenuButton>

            <UserActionsMenuButton onClick={ handleDelete }>
                Delete Book
                <TrashIcon size={18} />
            </UserActionsMenuButton>

            { showEditTagsModal && (
                <EditTagsModal 
                    book={book}
                    closeModalFn={ () => setShowEditTagsModal(false) }
                />
            )}

            { showDeleteModal && (
                <DeleteBookModal 
                    book={book}
                    closeModalFn={ () => setShowDeleteModal(false)}
                />
            )}
            
        </div>
    )
}


function useEventHandler({
    id,
    isOpen,
    setIsOpen
} : {
    id : string
    isOpen : boolean
    setIsOpen : Dispatch<SetStateAction<boolean>>
}) {
    useEffect( () => {

        if( !isOpen ) return 

        function handleOutsideClick(e : MouseEvent) {

            if( !(e.target instanceof HTMLElement) ) return
            
            const userActionsMenuEl = document.querySelector(`#${id}`)
            if( !userActionsMenuEl ) return

            const els = document.elementsFromPoint(e.pageX, e.pageY)

            if( !els.some( el => el.id === id ) ) {
                setIsOpen(false)
            } 
        }
        document.addEventListener('click', handleOutsideClick)
        return () => document.removeEventListener('click', handleOutsideClick)
    }, [isOpen])
}