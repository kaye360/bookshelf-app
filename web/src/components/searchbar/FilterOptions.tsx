import { useContext } from "react";
import OptionButton from "./OptionButton";
import { BookShelfContext } from "../../routes/bookshelf/Books";
import { AllIcon, ReadIcon, UnreadIcon, FavouritesIcon, HashIcon } from "../base/Icon";

export default function FilterOptions() {

    const { searchParams, updateSearchParam } = useContext(BookShelfContext)

    return (
        <div className="flex items-center gap-3 px-4 overflow-x-auto scrollbar-hide text-primary-light">

            <OptionButton
                onClick={ () => updateSearchParam('filterBy', 'all') }
                isActive={searchParams.get('filterBy') === 'all'}
            >
                <AllIcon />
                All
            </OptionButton>

            <OptionButton
                onClick={ () => updateSearchParam('filterBy', 'read') }
                isActive={searchParams.get('filterBy') === 'read'}
            >
                <ReadIcon />
                Read
            </OptionButton>

            <OptionButton
                onClick={ () => updateSearchParam('filterBy', 'unread') }
                isActive={searchParams.get('filterBy') === 'unread'}
            >
                <UnreadIcon />
                Unread
            </OptionButton>

            <OptionButton
                onClick={ () => updateSearchParam('filterBy', 'favourite') }
                isActive={searchParams.get('filterBy') === 'favourite'}
            >
                <FavouritesIcon />
                Favourites
            </OptionButton>

            <OptionButton
                onClick={ () => updateSearchParam('filterBy', 'tag1') }
                isActive={searchParams.get('filterBy') === 'tag1'}
            >
                <HashIcon />
                tag1
            </OptionButton>

            <OptionButton
                onClick={ () => updateSearchParam('filterBy', 'science') }
                isActive={searchParams.get('filterBy') === '#science'}
            >
                <HashIcon />
                science
            </OptionButton>

            <OptionButton
                onClick={ () => updateSearchParam('filterBy', 'biology') }
                isActive={searchParams.get('filterBy') === '#biology'}
            >
                <HashIcon />
                biology
            </OptionButton>

            <OptionButton
                onClick={ () => updateSearchParam('filterBy', 'politics') }
                isActive={searchParams.get('filterBy') === '#politics'}
            >
                <HashIcon />
                politics
            </OptionButton>

        </div>
    )
}
