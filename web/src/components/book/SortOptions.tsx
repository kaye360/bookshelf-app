import { useContext } from "react";
import OptionButton from "./OptionButton";
import { BookShelfContext } from "../../routes/bookshelf/Books";
import { BookshelfParams } from "./bookshelfOptions";

export default function SortOptions() {

    const {searchParams, setSearchParams } = useContext(BookShelfContext)

    function sortBy(sortBy : BookshelfParams['sortBy']) {
        setSearchParams( prev => {
            prev.set('sortBy', sortBy)
            return prev
        }, {replace : true} )
    }

    return (
        <div className="grid grid-cols-[55px_1fr] items-start">

            <strong>Sort</strong>

            <div className="flex gap-3 flex-wrap">

                <OptionButton
                    onClick={ () => sortBy('title') }
                    isActive={searchParams.get('sortBy') === 'title'}
                >
                    <TitleButton />
                    Title
                </OptionButton>

                <OptionButton
                    onClick={ () => sortBy('authors') }
                    isActive={searchParams.get('sortBy') === 'authors'}
                >
                    <AuthorButton />
                    Author
                </OptionButton>

                <OptionButton
                    onClick={ () => sortBy('newest') }
                    isActive={searchParams.get('sortBy') === 'newest'}
                >
                    <NewestButton />
                    Newest
                </OptionButton>

                <OptionButton
                    onClick={ () => sortBy('oldest') }
                    isActive={searchParams.get('sortBy') === 'oldest'}
                >
                    <OldestButton />
                    Oldest
                </OptionButton>

            </div>
        </div>
    )
}


function TitleButton() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-align-left"><line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg>
    )
}


function AuthorButton() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
    )
}


function NewestButton() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-down"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
    )
}


function OldestButton() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
    )
}