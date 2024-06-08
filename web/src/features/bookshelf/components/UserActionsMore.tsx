import { useState } from "react";
import { EditIcon, BookIcon, TrashIcon } from "../../../components/common/Icon";
import UserActionsMoreButton from "./UserActionsMoreButton";
import { UserBook } from "../../book/types/types";
import EditTagsModal from "./EditTagsModal";


export default function UserActionsMore({book} : {book : UserBook}) {

    const [ showEditTagsModal, setShowEditTagsModal ] = useState(false)

    return (
        <div className="absolute bottom-[34px] -left-[0px] -right-[0px] overflow-hidden py-0 group-has-[:checked]/menu:py-2 max-h-0 group-has-[:checked]/menu:max-h-[150px] grid gap-0 bg-bg/95 rounded shadow-md transition-all">

            <UserActionsMoreButton onClick={ () => setShowEditTagsModal(true)}>
                Edit Tags
                <EditIcon size={18} />
            </UserActionsMoreButton>

            <UserActionsMoreButton>
                Book Info
                <BookIcon size={18} />
            </UserActionsMoreButton>

            <UserActionsMoreButton>
                Delete Book
                <TrashIcon size={18} />
            </UserActionsMoreButton>

            { showEditTagsModal && (
                <EditTagsModal 
                    book={book}
                    showEditTagsModal={showEditTagsModal} 
                    setShowEditTagsModal={setShowEditTagsModal}
                />
            )}
            
        </div>
    )
}
