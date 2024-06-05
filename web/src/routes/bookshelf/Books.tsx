import BaseLayout from "../../layouts/BaseLayout";
import SearchBar from "../../features/searchbar/components/SearchBar";
import { createContext } from "react";
import useBooks from "./useBooks";
import { BookShelfContextProps, bookShelfContextInitialState } from "../../features/bookshelf/services/initialState";
import FilterOptions from "../../features/searchbar/components/FilterOptions";


export const BookShelfContext = createContext<BookShelfContextProps>(bookShelfContextInitialState)


export default function BookShelf() {

    const {
        searchParams,
        setSearchParams,
        updateSearchParam,
        books,
        BookList,
        BookListItem
    } = useBooks()

    return (
        <BaseLayout>
        
            <BookShelfContext.Provider value={{searchParams, setSearchParams, updateSearchParam}}>
                <div className="grid gap-2 my-6">
                    <SearchBar />
                    <FilterOptions />
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
