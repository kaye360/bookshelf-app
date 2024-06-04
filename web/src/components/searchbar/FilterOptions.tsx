import { useContext } from "react";
import OptionButton from "./OptionButton";
import { BookShelfContext } from "../../routes/bookshelf/Books";
import { BookshelfParams } from "../book/bookshelfOptions";
import { AllIcon, ReadIcon, UnreadIcon, FavouritesIcon, HashIcon } from "../base/Icon";

export default function FilterOptions() {

    const { searchParams, setSearchParams } = useContext(BookShelfContext)

    function filterBy(filterBy: BookshelfParams['filterBy']) {
        setSearchParams(prev => {
            prev.set('filterBy', filterBy)
            return prev
        }, {replace : true} )
    } 

    return (
        <div className="flex items-center gap-3 px-4 overflow-x-auto scrollbar-hide text-primary-light">

            <OptionButton
                onClick={ () => filterBy('all') }
                isActive={searchParams.get('filterBy') === 'all'}
            >
                <AllIcon />
                All
            </OptionButton>

            <OptionButton
                onClick={ () => filterBy('read') }
                isActive={searchParams.get('filterBy') === 'read'}
            >
                <ReadIcon />
                Read
            </OptionButton>

            <OptionButton
                onClick={ () => filterBy('unread') }
                isActive={searchParams.get('filterBy') === 'unread'}
            >
                <UnreadIcon />
                Unread
            </OptionButton>

            <OptionButton
                onClick={ () => filterBy('favourite') }
                isActive={searchParams.get('filterBy') === 'favourite'}
            >
                <FavouritesIcon />
                Favourites
            </OptionButton>

            <OptionButton
                onClick={ () => filterBy('tag1') }
                isActive={searchParams.get('filterBy') === 'tag1'}
            >
                <HashIcon />
                tag1
            </OptionButton>

            <OptionButton
                onClick={ () => filterBy('#science') }
                isActive={searchParams.get('filterBy') === '#science'}
            >
                <HashIcon />
                science
            </OptionButton>

            <OptionButton
                onClick={ () => filterBy('#biology') }
                isActive={searchParams.get('filterBy') === '#biology'}
            >
                <HashIcon />
                biology
            </OptionButton>

            <OptionButton
                onClick={ () => filterBy('#politics') }
                isActive={searchParams.get('filterBy') === '#politics'}
            >
                <HashIcon />
                politics
            </OptionButton>

        </div>
    )
}
