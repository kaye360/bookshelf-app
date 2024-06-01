import BaseLayout from "../../layouts/BaseLayout";
import SearchBar from "../../components/searchbar/SearchBar";
import { createContext } from "react";
import useBooks from "./useBooks";
import { BookShelfContextProps, bookShelfContextInitialState } from "../../components/book/bookshelfOptions";
import FilterOptions from "../../components/searchbar/FilterOptions";


export const BookShelfContext = createContext<BookShelfContextProps>(bookShelfContextInitialState)


export default function BookShelf() {

    const {
        searchParams,
        setSearchParams,
        books,
        BookList,
        BookListItem
    } = useBooks()

    return (
        <BaseLayout>
        
            <BookShelfContext.Provider value={{searchParams, setSearchParams}}>
                <div className="grid gap-2 my-6">
                    <SearchBar />
                    <FilterOptions />
                </div>
            </BookShelfContext.Provider>

            <BookList>
                {books.map( book => (
                    <BookListItem book={book} key={book.id} />
                ))}
            </BookList>
        </BaseLayout>
    )
} 
