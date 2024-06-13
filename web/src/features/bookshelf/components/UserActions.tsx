import { BookmarkIcon, CheckIcon, FavouritesIcon, MoreIcon, UncheckIcon } from "../../../components/common/Icon";
import ToolTip from "../../../components/common/ToolTip";
import ToolTipWrapper from "../../../components/common/ToolTipWrapper";
import { UserBook } from "../../book/types/types";
import useUserProps from "../hooks/useUserProps";
import UserActionButton from "./UserActionButton";
import UserActionsMore from "./UserActionsMore";

export default function UserActions({book} : {book : UserBook}) {

    const { userProps, handlers, moreActions} = useUserProps(book)
    const { handleIsFavouriteClick, handleIsOwnedClick, handleIsReadClick } = handlers
    const { isMoreActionsOpen, setIsMoreActionsOpen, toggleIsMoreActionsOpen } = moreActions

    const IsReadIcon = userProps.isRead ? CheckIcon : UncheckIcon

    return (
        <div className="flex items-top gap-1 mt-auto relative group/menu">

            <ToolTipWrapper>
                <UserActionButton onClick={handleIsFavouriteClick}>
                    <FavouritesIcon size={20} className={userProps.isFavourite ? 'fill-accent/50 stroke-accent/50 ' : ''} />
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
                    <BookmarkIcon size={20} className={userProps.group === 'owned' ? 'fill-primary-dark/40 stroke-primary-light' : ''} />
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
