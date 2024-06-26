import { useContext } from "react";
import OptionButton from "./OptionButton";
import { BookShelfContext } from "../../../routes/bookshelf/Bookshelf";
import { ArrowDownIcon, ArrowUpIcon, ParagraphIcon, UserIcon } from "../../../components/common/Icon";


export default function SortOptions() {

    const {searchParams, updateSearchParam } = useContext(BookShelfContext)

    return (
        <div className="grid grid-cols-[55px_1fr] items-start">

            <strong>Sort</strong>

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
        </div>
    )
}






