import { useState } from "react"
import SearchButton from "./SearchButton"
import SearchInput from "./SearchInput"
import CurrentSearchParamBar from "./CurrentSearchParamBar"
import EditSearchBarParams from "./EditSearchBarParams"


export default function SearchBar() {
    
    const [showFilters, setShowFilters] = useState<boolean>(true)

    return (
        <div className="grid gap-0 text-primary-dark mb-0">

            <div className="flex items-stretch border border-primary-light rounded-lg has-[input:focus]:border-primary-light/70 ">

                <SearchInput />
                <SearchButton />

            </div>

            <CurrentSearchParamBar setShowFilters={setShowFilters} />

            <EditSearchBarParams 
                showFilters={showFilters} 
                setShowFilters={setShowFilters}
            />

        </div>
    )
}


