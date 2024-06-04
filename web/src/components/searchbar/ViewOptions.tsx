import { useContext } from "react";
import OptionButton from "./OptionButton";
import { BookShelfContext } from "../../routes/bookshelf/Books";
import { BookshelfParams } from "../book/bookshelfOptions";
import { GridIcon, ListIcon, CardIcon } from "../base/Icon";

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
