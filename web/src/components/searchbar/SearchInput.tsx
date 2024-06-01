import { useContext } from "react";
import { BookShelfContext } from "../../routes/bookshelf/Books";

export default function SearchInput() {

    const { setSearchParams } = useContext(BookShelfContext)

    return (
        <input 
            name="search" 
            className="bg-transparent h-12 w-full px-4 focus:outline-0 text-primary-dark font-base" 
            placeholder="Search your library..."
            onChange={ (e) => setSearchParams( prev => {
                prev.set('searchQuery', e.target.value)
                return prev
            }, {replace : true} ) }
        />
    )
}
