import OptionButton from "./OptionButton";
import { AllIcon, CheckIcon, UncheckIcon, FavouritesIcon, BookmarkIcon, FileTextIcon, ArrowDownIcon, ArrowUpIcon, ParagraphIcon, UserIcon, HashIcon, CardIcon, GridIcon, ListIcon } from "../../../../components/common/Icon";
import { useStore } from "../../../../store/store";
import { getTagsFromBookList } from "../../../tags/services/getTagsFromBookList";
import { useBookshelfContext } from "../../hooks/useBookShelfContext";

function FilterOptions() {

    const { searchParams, updateSearchParam } = useBookshelfContext()

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

function SortOptions() {

    const {searchParams, updateSearchParam } = useBookshelfContext()

    return (
        <div className="flex gap-3 flex-wrap">

            <OptionButton
                onClick={ () => updateSearchParam('sortBy', 'title') }
                isActive={searchParams.get('sortBy') === 'title'}
            >
                <ParagraphIcon />
                Title
            </OptionButton>

            <OptionButton
                onClick={ () => updateSearchParam('sortBy', 'authors') }
                isActive={searchParams.get('sortBy') === 'authors'}
            >
                <UserIcon />
                Author
            </OptionButton>

            <OptionButton
                onClick={ () => updateSearchParam('sortBy', 'newest') }
                isActive={searchParams.get('sortBy') === 'newest'}
            >
                <ArrowDownIcon />
                Newest
            </OptionButton>

            <OptionButton
                onClick={ () => updateSearchParam('sortBy', 'oldest') }
                isActive={searchParams.get('sortBy') === 'oldest'}
            >
                <ArrowUpIcon />
                Oldest
            </OptionButton>

        </div>
    )
}

function TagOptions() {

    const { books } = useStore()
    const { searchParams, updateSearchParam } = useBookshelfContext()

    const tags = getTagsFromBookList(books).slice(0,15)

    return (
        <div className={`
            flex items-center gap-3 flex-wrap
            ${ searchParams.get('searchQuery') ? 'opacity-40' : ''} 
        `}>

            { tags.map( tag => (
                <OptionButton
                    key={tag.tag}
                    onClick={ () => updateSearchParam('filterBy', tag.tag)}
                    isActive={searchParams.get('filterBy') === tag.tag}
                >
                    <HashIcon size={18} />
                    {tag.tag}
                </OptionButton>
            ))}

        </div>
    )
}

function ViewOptions() {

    const { searchParams, updateSearchParam } = useBookshelfContext()

    return (
        <div className="flex flex-wrap gap-3">

            <OptionButton 
                onClick={ () => updateSearchParam('viewAs', 'grid') }
                isActive={searchParams.get('viewAs') === 'grid'}
            >
                <GridIcon />
                Grid
            </OptionButton>

            <OptionButton 
                onClick={ () => updateSearchParam('viewAs', 'list') }
                isActive={searchParams.get('viewAs') === 'list'}
            >
                <ListIcon />
                List
            </OptionButton>

            <OptionButton 
                onClick={ () => updateSearchParam('viewAs', 'card') }
                isActive={searchParams.get('viewAs') === 'card'}
            >
                <CardIcon />
                Card
            </OptionButton>

        </div>
    )
}

export default {
    FilterOptions,
    SortOptions,
    TagOptions,
    ViewOptions
}