import { AllIcon, CheckIcon, UncheckIcon, FavouritesIcon, BookmarkIcon, FileTextIcon, ParagraphIcon, UserIcon, ArrowDownIcon, ArrowUpIcon, CardIcon, GridIcon, ListIcon } from "../../../components/common/Icon";
import OptionButton from "../../bookshelf/components/searchbar/OptionButton";
import useBookshelfSettings from "../hooks/useBookshelfSettings";


export default function BookShelfSettings({ 
    isTouched, 
    touchForm 
} : {
    isTouched : boolean
    touchForm : () => void
}) {
    
    const { view, filter, sort, handleClick } = useBookshelfSettings({isTouched, touchForm})

    return (
        <div>

            <input type="hidden" name="view" value={view} />
            <input type="hidden" name="filter" value={filter} />
            <input type="hidden" name="sort" value={sort} />

            <h2 className="text-lg font-medium mb-3">
                Bookshelf Default Settings
            </h2>

            <div className="grid grid-cols-[auto_1fr] gap-4">

                <h3>View</h3>

                <div className="flex items-center gap-4">
                    <OptionButton 
                        onClick={ () => handleClick('view', 'grid') }
                        isActive={ view === 'grid' }
                    >
                        <GridIcon />
                        Grid
                    </OptionButton>

                    <OptionButton 
                        onClick={ () => handleClick('view', 'list') }
                        isActive={ view === 'list' }
                    >
                        <ListIcon />
                        List
                    </OptionButton>

                    <OptionButton 
                        onClick={ () => handleClick('view', 'card') }
                        isActive={ view === 'card' }
                    >
                        <CardIcon />
                        Card
                    </OptionButton>
                </div>

                <h3>Filters</h3>

                <div className="flex items-center gap-4">

                    <OptionButton
                            onClick={ () => handleClick('filter', 'all') }
                            isActive={ filter === 'all' }
                        >
                        <AllIcon size={18} />
                        All
                    </OptionButton>

                    <OptionButton
                        onClick={ () => handleClick('filter', 'read') }
                        isActive={ filter === 'read' }
                    >
                        <CheckIcon size={18} />
                        Read
                    </OptionButton>

                    <OptionButton
                        onClick={ () => handleClick('filter', 'unread') }
                        isActive={ filter === 'unread' }
                    >
                        <UncheckIcon size={18} />
                        Unread
                    </OptionButton>

                    <OptionButton
                        onClick={ () => handleClick('filter', 'favourites') }
                        isActive={ filter === 'favourites' }
                    >
                        <FavouritesIcon size={18} />
                        Favourites
                    </OptionButton>

                    <OptionButton
                        onClick={ () => handleClick('filter', 'owned') }
                        isActive={ filter === 'owned'}
                    >
                        <BookmarkIcon size={18} />    
                        Owned
                    </OptionButton>

                    <OptionButton
                        onClick={ () => handleClick('filter', 'wishlist') }
                        isActive={ filter === 'wishlist'}
                    >
                        <FileTextIcon size={18} />
                        Wishlist
                    </OptionButton>

                </div>

                <h3>Sort</h3>

                <div className="flex items-center gap-4">

                    <OptionButton
                        onClick={ () => handleClick('sort', 'title') }
                        isActive={ sort === 'title' }
                    >
                        <ParagraphIcon />
                        Title
                    </OptionButton>

                    <OptionButton
                        onClick={ () => handleClick('sort', 'authors') }
                        isActive={ sort === 'authors' }
                    >
                        <UserIcon />
                        Author
                    </OptionButton>

                    <OptionButton
                        onClick={ () => handleClick('sort', 'newest') }
                        isActive={ sort === 'newest' }
                    >
                        <ArrowDownIcon />
                        Newest
                    </OptionButton>

                    <OptionButton
                        onClick={ () => handleClick('sort', 'oldest') }
                        isActive={ sort === 'oldest' }
                    >
                        <ArrowUpIcon />
                        Oldest
                    </OptionButton>

                </div>

            </div>
        </div>
    )
}
