import { BookmarkIcon, CheckIcon, FavouritesIcon, MoreIcon, UncheckIcon } from "../../../components/common/Icon";
import ToolTip from "../../../components/common/ToolTip";
import ToolTipWrapper from "../../../components/common/ToolTipWrapper";
import { UserBook } from "../../book/types/types";
import useUserProps from "../hooks/useUserProps";

export default function UserActions({book} : {book : UserBook}) {

    const { userProps, handleIsFavouriteClick, handleIsReadClick, handleIsOwnedClick } = useUserProps(book)

    const IsReadIcon = userProps.isRead ? CheckIcon : UncheckIcon

    return (
        <div className="flex items-top gap-3 mt-auto">

            <ToolTipWrapper>
                <button onClick={handleIsFavouriteClick}>
                    <FavouritesIcon className={userProps.isFavourite ? 'fill-accent/50 stroke-accent/50' : ''} />
                    <ToolTip title="Favourite" />
                </button>
            </ToolTipWrapper>

            <ToolTipWrapper>
                <button onClick={handleIsReadClick}>
                    <IsReadIcon size={18} />
                    <ToolTip title="Read" />
                </button>
            </ToolTipWrapper>

            <ToolTipWrapper>
                <button onClick={handleIsOwnedClick}>
                    <BookmarkIcon size={18} className={userProps.group === 'owned' ? 'fill-primary-light/50 stroke-primary-light/50' : ''} />
                    <ToolTip title="Owned" />
                </button>
            </ToolTipWrapper>

            <MoreIcon size={18} className="ml-auto" />
            
        </div>
  )
}
