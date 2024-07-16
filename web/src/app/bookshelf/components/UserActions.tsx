import { BookmarkIcon, CheckIcon, FavouritesIcon, MoreIcon, UncheckIcon } from "../../../components/common/Icon";
import Tooltip from "../../../components/common/Tooltip";
import useToggleState from "../../../hooks/useToggleState";
import { Book } from "../../../types/types";
import useHandleUpdateBookIsFavourite from "../hooks/useHandleUpdateBookIsFavourite";
import useHandleUpdateBookIsOwned from "../hooks/useHandleUpdateBookIsOwned";
import useHandleUpdateBookIsRead from "../hooks/useHandleUpdateBookIsRead";
import UserActionButton from "./UserActionButton";
import UserActionsMore from "./UserActionsMore";

export default function UserActions({book} : {book : Book}) {

    const { handleUpdateBookIsFavourite, isFavourite } = useHandleUpdateBookIsFavourite({book})
    const { handleUpdateBookIsOwned, isOwned }         = useHandleUpdateBookIsOwned({book})
    const { handleUpdateBookIsRead, isRead }           = useHandleUpdateBookIsRead({book})

    const [isMoreActionsOpen, setIsMoreActionsOpen, toggleIsMoreActionsOpen] = useToggleState(false)

    const IsReadIcon = isRead ? CheckIcon : UncheckIcon

    return (
        <div className="flex items-top gap-1 mt-auto group/menu relative">

            <Tooltip title="Favourites">
                <UserActionButton onClick={handleUpdateBookIsFavourite}>
                    <FavouritesIcon size={20} className={isFavourite ? 'fill-accent/50 stroke-accent/50 ' : ''} />
                </UserActionButton>
            </Tooltip>

            <Tooltip title="Read/Unread Status">
                <UserActionButton onClick={handleUpdateBookIsRead}>
                    <IsReadIcon size={20} />
                </UserActionButton>
            </Tooltip>

            <Tooltip title="Owned/Wishlist Status">
                <UserActionButton onClick={ handleUpdateBookIsOwned }>
                    <BookmarkIcon size={20} className={isOwned ? 'fill-primary-dark/40 stroke-primary-light' : ''} />
                </UserActionButton>
            </Tooltip>

            <Tooltip title="More Actions" className="ml-auto">
                <UserActionButton onClick={ toggleIsMoreActionsOpen }>
                    <MoreIcon size={18} />
                </UserActionButton>
            </Tooltip>

            <UserActionsMore 
                book={book} 
                isOpen={isMoreActionsOpen} 
                setIsOpen={setIsMoreActionsOpen} 
            />
            
        </div>
  )
}
