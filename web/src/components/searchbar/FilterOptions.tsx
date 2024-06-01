import { useContext } from "react";
import OptionButton from "./OptionButton";
import { BookShelfContext } from "../../routes/bookshelf/Books";
import { BookshelfParams } from "../book/bookshelfOptions";

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


function AllIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
    )
}


function ReadIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    )
}


function UnreadIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
    )
}


function FavouritesIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
    )
}


function HashIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-hash"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>
    )
}