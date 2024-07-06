import { BookmarkIcon, CheckIcon, FavouritesIcon, MoreIcon, UncheckIcon } from "../../../components/common/Icon";
import ToolTip from "../../../components/common/ToolTip";
import ToolTipWrapper from "../../../components/common/ToolTipWrapper";
import useToggleState from "../../../hooks/useToggleState";
import { UserBook } from "../../../types/types";
import { useUpdateUserBookIsFavourite } from "../../userBook/api/updateUserBookIsFavourite";
import { useUpdateUserBookIsOwned } from "../../userBook/api/updateUserBookIsOwned";
import { useUpdateUserBookIsRead } from "../../userBook/api/updateUserBookIsRead";
import UserActionButton from "./UserActionButton";
import UserActionsMore from "./UserActionsMore";

export default function UserActions({book} : {book : UserBook}) {

    const { handleClick : handleIsFavouriteClick, isFavourite } = useUpdateUserBookIsFavourite({book})
    const { handleClick : handleIsReadClick, isRead }           = useUpdateUserBookIsRead({book})
    const { handleClick : handleIsOwnedClick, isOwned }         = useUpdateUserBookIsOwned({book})

    const [isMoreActionsOpen, setIsMoreActionsOpen, toggleIsMoreActionsOpen] = useToggleState(false)

    const IsReadIcon = isRead ? CheckIcon : UncheckIcon

    return (
        <div className="flex items-top gap-1 mt-auto relative group/menu">

            <ToolTipWrapper>
                <UserActionButton onClick={handleIsFavouriteClick}>
                    <FavouritesIcon size={20} className={isFavourite ? 'fill-accent/50 stroke-accent/50 ' : ''} />
                    <ToolTip title="Favourite" />
                </UserActionButton>
            </ToolTipWrapper>

            <ToolTipWrapper>
                <UserActionButton onClick={handleIsReadClick}>
                    <IsReadIcon size={20} />
                    <ToolTip title="Read" />
                </UserActionButton>
            </ToolTipWrapper>

            <ToolTipWrapper>
                <UserActionButton onClick={handleIsOwnedClick}>
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
