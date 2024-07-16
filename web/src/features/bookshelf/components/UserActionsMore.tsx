import { ComponentPropsWithoutRef, Dispatch, SetStateAction, useEffect, useState } from "react";
import { EditIcon, BookIcon, TrashIcon } from "../../../components/common/Icon";
import UserActionsMoreButton from "./UserActionsMoreButton";
import EditTagsModal from "./EditTagsModal";
import { useNavigate } from "react-router-dom";
import DeleteBookModal from "./DeleteBookModal";
import { Book } from "../../../types/types";


interface UserActionsMoreProps extends ComponentPropsWithoutRef<'div'> {
    book : Book
    isOpen : boolean
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
}

export default function UserActionsMore({book, isOpen, setIsOpen} : UserActionsMoreProps) {

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
            className={`absolute bottom-[34px] left-0 w-full overflow-hidden py-0 max-h-0 grid gap-0 bg-bg/95 rounded shadow-md transition-all duration-300 ${isOpen ? 'py-2 max-h-[150px]' : ''}`}
        >

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
            
            const userActionsMoreEl = document.querySelector(`#${id}`)
            if( !userActionsMoreEl ) return

            const els = document.elementsFromPoint(e.pageX, e.pageY)

            if( !els.some( el => el.id === id ) ) {
                setIsOpen(false)
            } 
        }
        document.addEventListener('click', handleOutsideClick)
        return () => document.removeEventListener('click', handleOutsideClick)
    }, [isOpen])
}