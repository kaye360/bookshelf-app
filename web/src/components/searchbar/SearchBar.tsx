import { useState } from "react"
import SearchButton from "./SearchButton"
import FilterButton from "./FilterButton"
import SearchInput from "./SearchInput"
import ViewOptions from "./ViewOptions"
import SortOptions from "./SortOptions"
import { CloseIcon } from "../base/Icon"


export default function SearchBar() {
    
    const [showFilters, setShowFilters] = useState<boolean>(false)

    return (
        <div className="grid gap-0 text-primary-light/70 mb-3">

            <div className="flex items-stretch border border-primary-light/20 rounded-lg has-[input:focus]:border-primary-light/70 ">

                <SearchInput />
                <FilterButton setShowFilters={setShowFilters} />
                <SearchButton />

            </div>

            <div 
                className={`
                    grid gap-4 relative bg-bg-accent/25 border rounded-lg transition-all overflow-hidden text-md
                    ${ showFilters ? 'px-3 md:px-6 py-6 max-h-[500px] border-primary-light/10' : 'p-0 max-h-[0px] border-transparent'}
                `}
            >
                <button
                    onClick={() => setShowFilters(false)}
                    className="absolute right-6 top-6 active:text-accent"
                >
                    <CloseIcon />
                </button>

                <ViewOptions />
                <SortOptions />

            </div>

        </div>
    )
}
