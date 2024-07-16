import OptionButton from "./OptionButton";
import { AllIcon, CheckIcon, UncheckIcon, FavouritesIcon, BookmarkIcon, FileTextIcon } from "../../../../components/common/Icon";
import { useBookshelfParams } from "../../hooks/useBookShelfParamsContext";



export default function FilterOptions() {

    const { searchParams, updateSearchParam } = useBookshelfParams()

    return (
        <div className={`
            flex items-center gap-3 flex-wrap
            ${ searchParams.get('searchQuery')  ? 'opacity-40' : ''} 
        `}>

            <OptionButton
                onClick={ () => updateSearchParam('filterBy', 'all') }
                isActive={searchParams.get('filterBy') === 'all'}
            >
                <AllIcon size={18} />
                All
            </OptionButton>

            <OptionButton
                onClick={ () => updateSearchParam('filterBy', 'read') }
                isActive={searchParams.get('filterBy') === 'read'}
            >
                <CheckIcon size={18} />
                Read
            </OptionButton>

            <OptionButton
                onClick={ () => updateSearchParam('filterBy', 'unread') }
                isActive={searchParams.get('filterBy') === 'unread'}
            >
                <UncheckIcon size={18} />
                Unread
            </OptionButton>

            <OptionButton
                onClick={ () => updateSearchParam('filterBy', 'favourites') }
                isActive={searchParams.get('filterBy') === 'favourites'}
            >
                <FavouritesIcon size={18} />
                Favourites
            </OptionButton>

            <OptionButton
                onClick={ () => updateSearchParam('filterBy', 'owned') }
                isActive={searchParams.get('filterBy') === 'owned'}
            >
                <BookmarkIcon size={18} />    
                Owned
            </OptionButton>

            <OptionButton
                onClick={ () => updateSearchParam('filterBy', 'wishlist') }
                isActive={searchParams.get('filterBy') === 'wishlist'}
            >
                <FileTextIcon size={18} />
                Wishlist
            </OptionButton>

        </div>
    )
}
