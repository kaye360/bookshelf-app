import BaseLayout from "../../layouts/BaseLayout";
import SearchBar from "../../features/searchbar/components/SearchBar";
import { createContext } from "react";
import { bookShelfContextInitialState } from "../../features/bookshelf/services/initialState";
import FilterOptions from "../../features/searchbar/components/FilterOptions";
import { BookShelfContextProps } from "../../features/bookshelf/types/types";
import useSearchBarParams from "../../features/searchbar/hooks/useSearchBarParams";
import TagOptions from "../../features/searchbar/components/TagOptions";


export const BookShelfContext = createContext<BookShelfContextProps>(bookShelfContextInitialState)


export default function BookShelf() {

    const {
        searchParams,
        setSearchParams,
        updateSearchParam,
        books,
        BookList,
        BookListItem
    } = useSearchBarParams()

    return (
        <BaseLayout>
        
            <BookShelfContext.Provider value={{searchParams, setSearchParams, updateSearchParam}}>
                <div className="grid gap-3 mt-6 mb-8">
                    <SearchBar />
                    <FilterOptions />
                    <TagOptions />
                </div>
                <BookList>
                    {books.map( book => (
                        <BookListItem book={book} key={book.id} />
                    ))}
                </BookList>
            </BookShelfContext.Provider>

        </BaseLayout>
    )
} 
