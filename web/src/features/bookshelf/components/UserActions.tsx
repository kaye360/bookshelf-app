import { BookmarkIcon, CheckIcon, FavouritesIcon, MoreIcon, UncheckIcon } from "../../../components/common/Icon";
import ToolTip from "../../../components/common/ToolTip";
import ToolTipWrapper from "../../../components/common/ToolTipWrapper";
import useToggleState from "../../../hooks/useToggleState";
import { UserBook } from "../../../types/types";
import useHandleUpdateBookIsFavourite from "../hooks/useHandleUpdateBookIsFavourite";
import useHandleUpdateBookIsOwned from "../hooks/useHandleUpdateBookIsOwned";
import useHandleUpdateBookIsRead from "../hooks/useHandleUpdateBookIsRead";
import UserActionButton from "./UserActionButton";
import UserActionsMore from "./UserActionsMore";

export default function UserActions({book} : {book : UserBook}) {

    const { handleUpdateBookIsFavourite, isFavourite } = useHandleUpdateBookIsFavourite({book})
    const { handleUpdateBookIsOwned, isOwned }         = useHandleUpdateBookIsOwned({book})
    const { handleUpdateBookIsRead, isRead }           = useHandleUpdateBookIsRead({book})

    const [isMoreActionsOpen, setIsMoreActionsOpen, toggleIsMoreActionsOpen] = useToggleState(false)

    const IsReadIcon = isRead ? CheckIcon : UncheckIcon

    return (
        <div className="flex items-top gap-1 mt-auto relative group/menu">

            <ToolTipWrapper>
                <UserActionButton onClick={handleUpdateBookIsFavourite}>
                    <FavouritesIcon size={20} className={isFavourite ? 'fill-accent/50 stroke-accent/50 ' : ''} />
                    <ToolTip title="Favourite" />
                </UserActionButton>
            </ToolTipWrapper>

            <ToolTipWrapper>
                <UserActionButton onClick={handleUpdateBookIsRead}>
                    <IsReadIcon size={20} />
                    <ToolTip title="Read" />
                </UserActionButton>
            </ToolTipWrapper>

            <ToolTipWrapper>
                <UserActionButton onClick={ handleUpdateBookIsOwned }>
                    <BookmarkIcon size={20} className={isOwned ? 'fill-primary-dark/40 stroke-primary-light' : ''} />
                    <ToolTip title="Owned" />
                </UserActionButton>
            </ToolTipWrapper>

            <ToolTipWrapper className="ml-auto">
                <UserActionButton onClick={ toggleIsMoreActionsOpen }>
                    <MoreIcon size={18} />
                    <ToolTip title="More" />
                </UserActionButton>
            </ToolTipWrapper>

            <UserActionsMore 
                book={book} 
                isOpen={isMoreActionsOpen} 
                setIsOpen={setIsMoreActionsOpen} 
            />
            
        </div>
  )
}
