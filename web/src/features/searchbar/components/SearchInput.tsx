import { useContext } from "react";
import { BookShelfContext } from "../../../routes/bookshelf/Bookshelf";

export default function SearchInput() {

    const { searchParams, updateSearchParam } = useContext(BookShelfContext)

    return (
        <input 
            type="search"
            name="search" 
            className="bg-transparent h-12 w-full px-4 focus:outline-0 text-primary-dark font-base" 
            placeholder="Search your library..."
            defaultValue={ searchParams.get('searchQuery') }
            onChange={ (e) => updateSearchParam('searchQuery', e.target.value) }
        />
    )
}
