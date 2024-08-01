import { useState } from "react"
import SearchButton from "./SearchButton"
import SearchInput from "./SearchInput"
import CurrentSettings from "../currentSettings/CurrentSettings"
import SettingsMenu from "../settingsMenu/SettingsMenu"

export default function SearchBar() {
    
    const [showFilters, setShowFilters] = useState<boolean>(false)

    return (
        <div className="grid gap-0 text-primary-dark mb-4">

            <div className="flex items-stretch border border-primary-light rounded-lg has-[input:focus]:border-primary-light/70 mb-2">

                <SearchInput />
                <SearchButton />

            </div>

            <CurrentSettings setShowFilters={setShowFilters} />

            <SettingsMenu 
                showFilters={showFilters} 
                setShowFilters={setShowFilters}
            />

        </div>
    )
}


