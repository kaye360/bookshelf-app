import { BookmarkIcon, CheckIcon, FavouritesIcon, MoreIcon, UncheckIcon } from "../../../components/common/Icon";
import ToolTip from "../../../components/common/ToolTip";
import ToolTipWrapper from "../../../components/common/ToolTipWrapper";
import { UserBook } from "../../book/types/types";
import useUserProps from "../hooks/useUserProps";
import UserActionsMore from "./UserActionsMore";

export default function UserActions({book} : {book : UserBook}) {

    const { userProps, handleIsFavouriteClick, handleIsReadClick, handleIsOwnedClick } = useUserProps(book)

    const IsReadIcon = userProps.isRead ? CheckIcon : UncheckIcon

    return (
        <div className="flex items-top gap-3 mt-auto relative group/menu">

            <ToolTipWrapper>
                <button onClick={handleIsFavouriteClick}>
                    <FavouritesIcon size={20} className={userProps.isFavourite ? 'fill-accent/50 stroke-accent/50' : ''} />
                    <ToolTip title="Favourite" />
                </button>
            </ToolTipWrapper>

            <ToolTipWrapper>
                <button onClick={handleIsReadClick}>
                    <IsReadIcon size={20} />
                    <ToolTip title="Read" />
                </button>
            </ToolTipWrapper>

            <ToolTipWrapper>
                <button onClick={handleIsOwnedClick}>
                    <BookmarkIcon size={20} className={userProps.group === 'owned' ? 'fill-primary-light/50 stroke-primary-light/50' : ''} />
                    <ToolTip title="Owned" />
                </button>
            </ToolTipWrapper>

            <ToolTipWrapper className="ml-auto cursor-pointer">
                <button className="cursor-pointer">
                    <label>
                        <MoreIcon size={18} className="cursor-pointer" />
                        <input type="checkbox" defaultChecked={false} className="hidden" />
                    </label>
                    <ToolTip title="More" />
                </button>
            </ToolTipWrapper>

            <UserActionsMore book={book} />
            
        </div>
  )
}
