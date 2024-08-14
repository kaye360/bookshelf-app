import OptionButton from "./OptionButton";
import { AllIcon, CheckIcon, UncheckIcon, FavouritesIcon, BookmarkIcon, FileTextIcon, ArrowDownIcon, ArrowUpIcon, ParagraphIcon, UserIcon, HashIcon, CardIcon, GridIcon, ListIcon } from "../../../../components/common/Icon";
import { useStore } from "../../../../store/store";
import { getTagsFromBookList } from "../../../tags/services/getTagsFromBookList";
import useBookshelfParams from "../../hooks/useBookshelfParams";
import { isValidFilter, isValidSort, isValidView } from "../../services/isValidSetting";
import { UserSettings } from "../../../../types/types";

function Filter() {

    const { settings } = useStore()
    const { searchParams, updateSearchParam } = useBookshelfParams()
    const filterParam = searchParams.get('viewAs')

    function isActive(filter : UserSettings['filter']) : boolean {
        return isValidFilter(filterParam) ? filterParam === filter : settings.filter === filter
    }

    return (
        <div className={`
            flex items-center gap-3 flex-wrap
            ${ searchParams.get('searchQuery')  ? 'opacity-40' : ''} 
        `}>

            <OptionButton
                onClick={ () => updateSearchParam('filterBy', 'all') }
                isActive={ isActive('all') }
            >
                <AllIcon size={18} />
                All
            </OptionButton>

            <OptionButton
                onClick={ () => updateSearchParam('filterBy', 'read') }
                isActive={ isActive('read') }
            >
                <CheckIcon size={18} />
                Read
            </OptionButton>

            <OptionButton
                onClick={ () => updateSearchParam('filterBy', 'unread') }
                isActive={ isActive('unread') }
            >
                <UncheckIcon size={18} />
                Unread
            </OptionButton>

            <OptionButton
                onClick={ () => updateSearchParam('filterBy', 'favourites') }
                isActive={ isActive('favourites') }
            >
                <FavouritesIcon size={18} />
                Favourites
            </OptionButton>

            <OptionButton
                onClick={ () => updateSearchParam('filterBy', 'owned') }
                isActive={ isActive('owned') }
            >
                <BookmarkIcon size={18} />    
                Owned
            </OptionButton>

            <OptionButton
                onClick={ () => updateSearchParam('filterBy', 'wishlist') }
                isActive={ isActive('wishlist') }
            >
                <FileTextIcon size={18} />
                Wishlist
            </OptionButton>

        </div>
    )
}

function Sort() {

    const { settings } = useStore()
    const {searchParams, updateSearchParam } = useBookshelfParams()
    const sortParam = searchParams.get('sortBy')

    function isActive(sort : UserSettings['sort']) : boolean {
        return isValidSort(sortParam) ? sortParam === sort : settings.sort === sort
    }

    return (
        <div className="flex gap-3 flex-wrap">

            <OptionButton
                onClick={ () => updateSearchParam('sortBy', 'title') }
                isActive={ isActive('title') }
            >
                <ParagraphIcon />
                Title
            </OptionButton>

            <OptionButton
                onClick={ () => updateSearchParam('sortBy', 'authors') }
                isActive={ isActive('authors') }
            >
                <UserIcon />
                Author
            </OptionButton>

            <OptionButton
                onClick={ () => updateSearchParam('sortBy', 'newest') }
                isActive={ isActive('newest') }
            >
                <ArrowDownIcon />
                Newest
            </OptionButton>

            <OptionButton
                onClick={ () => updateSearchParam('sortBy', 'oldest') }
                isActive={ isActive('oldest') }
            >
                <ArrowUpIcon />
                Oldest
            </OptionButton>

        </div>
    )
}

function Tag() {

    const { books } = useStore()
    const { searchParams, updateSearchParam } = useBookshelfParams()
    const tagParam = searchParams.get('taggedAs')
    const tags = getTagsFromBookList(books).slice(0,15)

    function isActive(tag : string) : boolean {
        return tagParam === tag
    }

    return (
        <div className={`
            flex items-center gap-3 flex-wrap
            ${ searchParams.get('searchQuery') ? 'opacity-40' : ''} 
        `}>

            { tags.map( tag => (
                <OptionButton
                    key={tag.tag}
                    onClick={ () => updateSearchParam('taggedAs', tag.tag)}
                    isActive={ isActive(tag.tag)}
                >
                    <HashIcon size={18} />
                    {tag.tag}
                </OptionButton>
            ))}

        </div>
    )
}

function View() {

    const { settings } = useStore()
    const { searchParams, updateSearchParam } = useBookshelfParams()
    const viewParam = searchParams.get('viewAs')

    function isActive(view : UserSettings['view']) : boolean {
        return isValidView(viewParam)
            ? viewParam === view
            : settings.view === view
    }

    return (
        <div className="flex flex-wrap gap-3">

            <OptionButton 
                onClick={ () => updateSearchParam('viewAs', 'grid') }
                isActive={ isActive('grid') }
            >
                <GridIcon />
                Grid
            </OptionButton>

            <OptionButton 
                onClick={ () => updateSearchParam('viewAs', 'list') }
                isActive={ isActive('list') }
            >
                <ListIcon />
                List
            </OptionButton>

            <OptionButton 
                onClick={ () => updateSearchParam('viewAs', 'card') }
                isActive={ isActive('card') }
            >
                <CardIcon />
                Card
            </OptionButton>

        </div>
    )
}

export default {
    Filter,
    Sort,
    Tag,
    View
}