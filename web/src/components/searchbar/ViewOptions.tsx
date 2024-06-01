import { useContext } from "react";
import OptionButton from "./OptionButton";
import { BookShelfContext } from "../../routes/bookshelf/Books";
import { BookshelfParams } from "../book/bookshelfOptions";

export default function ViewOptions() {

    const { searchParams, setSearchParams } = useContext(BookShelfContext)

    function viewAs(viewAs: BookshelfParams['viewAs']) {
        setSearchParams(prev => { 
            prev.set('viewAs', viewAs)
            return prev
        }, {replace : true} )
    }

    return (
        <div className="grid grid-cols-[55px_1fr] items-start">

            <strong>View</strong>

            <div className="flex flex-wrap gap-3">

                <OptionButton 
                    onClick={ () => viewAs('grid') }
                    isActive={searchParams.get('viewAs') === 'grid'}
                >
                    <GridIcon />
                    Grid
                </OptionButton>

                <OptionButton 
                    onClick={ () => viewAs('list') }
                    isActive={searchParams.get('viewAs') === 'list'}
                >
                    <ListIcon />
                    List
                </OptionButton>

                <OptionButton 
                    onClick={ () => viewAs('card') }
                    isActive={searchParams.get('viewAs') === 'card'}
                >
                    <CardIcon />
                    Card
                </OptionButton>

            </div>
        </div>
    )
}


function GridIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
    )
}


function ListIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
    )
}


function CardIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-credit-card"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
    )
}